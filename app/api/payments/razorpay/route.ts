import { auth } from "@clerk/nextjs/server";
import { errorResponse, successResponse } from "@/lib/api";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { updateOrderState } from "@/lib/business";
import { PAYMENT_STATUSES } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { action, amount, receipt, razorpayPaymentId, razorpayOrderId, razorpaySignature, orderDocId } = await request.json();

    if (action === "create_order") {
      // Create Razorpay Order
      const options = {
        amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: receipt || "rcptid_11",
      };
      
      const order = await razorpay.orders.create(options);
      return successResponse({ id: order.id, currency: order.currency, amount: order.amount });
    } 
    
    if (action === "verify_payment") {
      // Verify Razorpay Signature
      const secret = process.env.RAZORPAY_KEY_SECRET || "mock_key_secret";
      const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");

      if (generated_signature !== razorpaySignature) {
        // Warning: This ignores verification if keys are not set for mock mode. 
        // In production, this should always be validated.
        if (process.env.RAZORPAY_KEY_SECRET) {
          return errorResponse("Invalid signature", 400);
        }
      }

      // Update Database
      await connectToDatabase();
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderDocId, 
        { 
          razorpayPaymentId, 
          paymentStatus: PAYMENT_STATUSES.PAID 
        }, 
        { new: true }
      );
      
      if (updatedOrder) {
        // Trigger ledger and invoice updates if needed, since payment status changed
        await updateOrderState({ id: orderDocId, paymentStatus: PAYMENT_STATUSES.PAID });
      }

      return successResponse({ success: true, verified: true });
    }

    return errorResponse("Invalid action", 400);
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return errorResponse(error.message, 500);
  }
}
