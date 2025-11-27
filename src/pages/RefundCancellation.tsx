import Image from "next/image";
import React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container">
        <h1 className="text-center text-4xl mb-4"> Refund & Cancellation Policy</h1>

        <h3 className="text-2xl">1. Billing and Cancellation</h3>
        <h4 className="text-xl">1.1. Ongoing Subscription and Fees</h4>
         <p className="mb-4">
          HillyPix charges a fee to access the Services. We will bill you in
          advance for your subscription. Your subscription will continue and
          automatically renew regularly corresponding to the term of your
          subscription unless and until you cancel your subscription, or your
          account is otherwise suspended or terminated under these Terms.
          HillyPix reserves the right to change the terms of your subscription,
          including price, from time to time, effective as of the beginning of
          your next Billing Period following the date of the change. We will
          give you advance notice of these changes, but we will not be able to
          notify you of changes in any applicable taxes.
        </p>

        <h4 className="text-xl">1.2. Payment Method</h4>
        <p className="mb-4">
          Unless otherwise indicated, you will be required to provide a credit
          card or other payment method accepted by HillyPix, as may be updated
          from time to time ("Payment Method"). We will charge your Payment
          Method a periodic subscription fee regularly corresponding to the term
          of your subscription, and any applicable taxes. You are solely
          responsible for any fees charged to your Payment Method. When you
          provide a Payment Method, we will attempt to verify the information
          you entered by processing an authorization hold. We do not charge you
          in connection with this authorization hold, but your available balance
          or credit limit may be reduced. If you want to use a different Payment
          Method than the one you signed up to use during registration, you may
          edit your Payment Method information by logging in on the HillyPix
          Site and viewing your account details.
        </p>
        <h4 className="text-xl">1.3. Billing Holds</h4>
         <p className="mb-4">
          In the event of a failed attempt to charge to your Payment Method
          (e.g. if your Payment Method has expired), we reserve the right to
          retry billing your Payment Method. If you or we (through our payment
          service providers) update your Payment Method to remedy a change in
          validity or expiration date, we will automatically resume billing you
          for your subscription to the Services. We may suspend or cancel your
          access to the Services if we remain unable to successfully charge a
          valid Payment Method. You also remain responsible for any amounts you
          fail to pay in connection with your subscription, including collection
          costs, bank overdraft fees, collection agency fees, reasonable
          attorneys' fees, and arbitration or court costs. We may offer you the
          ability to pause your subscription for a specified period. If you do
          not cancel before the end of the pause period, billing will resume
          automatically
        </p>
        <h4 className="text-xl">1.4. Billing Period</h4>
         <p className="mb-4">
          As used in these Terms, “billing” shall indicate either a charge or
          debit, as applicable, against your Payment Method. We will
          automatically bill your Payment Method on the later of the day you
          start your subscription, and on each recurring billing date
          thereafter. Your “Billing Period” is the interval of time between each
          recurring billing date and corresponds to the term of your
          subscription. Where applicable, charges for one or more Services may
          be prorated for any partial month of service. To see your next
          recurring billing date, log in on the HillyPix Site and view your
          account details. You acknowledge that the timing of when you are
          billed and the amount billed each Billing Period may vary.
        </p>
        <h4 className="text-xl">1.5. Cancellation and Refunds</h4>
         <p className="mb-4">
          You can cancel your subscription by logging into your HillyPix account
          and following the instructions on your account page on the HillyPix
          Site. You must cancel your subscription before 11:59 p.m. Eastern Time
          on the day before your next recurring billing date in order to avoid
          being charged. Unless otherwise communicated, if you cancel your
          subscription, you will continue to have access to the Service through
          the end of your current Billing Period. However, if you modify your
          subscription to switch from one Service to another Service during your
          Billing Period, you may not have continued access to your original
          Service.
        </p>
         <p className="mb-4">
          Payments are nonrefundable. If you cancel or modify your subscription,
          or if your account is otherwise terminated under these Terms, you will
          not receive a credit, including for partially used periods of Service.
        </p>
        <h4 className="text-xl">1.6. Promotions</h4>
         <p className="mb-4">
          We may offer one-time events for purchase in connection with the
          Services. You will be charged for such events at the time of purchase.
          For instance, newly released movies, or shows on HillyPix and in order
          to grasp the first opportunity, you should pay and watch for a certain
          period of time. For clarity, such events may be subject to additional
          limitations provided to you during your purchase or in other materials
          made available to you.
        </p>

        <h4 className="text-xl">1.7. Pay Per View and Other One-Time Purchase Events</h4>
         <p className="mb-4">
          If we offer you a promotion (e.g., a promotional price, bundled
          subscription, or device-specific offer), the specific terms of the
          promotion will be disclosed during your sign-up or in other materials
          provided to you. We will begin billing your Payment Method for your
          subscription at the then-current, non-promotional price after your
          promotion ends unless you cancel prior to the end of your promotion or
          unless otherwise disclosed.
        </p>
      </div>
    <Footer />
    </div>
  );
};

export default RefundPage;
