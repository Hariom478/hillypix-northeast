"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function ContactUs() {
  return (
    <>
        <Header />
      {/* Contact Section */}
      <section
        className="py-10 lg:py-20 bg-cover bg-center contactbanner"
        style={{ backgroundImage: "url('src/assets/bg_1.jpg')" }}
      >
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-center text-white text-4xl font-bold mb-6 lg:mb-10">
            Contact
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div>
              <h2 className="text-white text-2xl font-semibold mb-6">Reach Us</h2>

              <div className="flex flex-col gap-6">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin className="text-white w-6 h-6 flex-shrink-0" />
                  <div>
                    <label className="uppercase text-sm text-gray-300 font-medium">
                      Address
                    </label>
                    <p className="text-white mt-1">
                      RQ5R+33V, Chümoukedima, Dimapur, Nagaland 797103
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="text-white w-6 h-6 flex-shrink-0" />
                  <div>
                    <label className="uppercase text-sm text-gray-300 font-medium">
                      Call Us
                    </label>
                    <p className="text-white mt-1">+91 9643458616</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="text-white w-6 h-6 flex-shrink-0" />
                  <div>
                    <label className="uppercase text-sm text-gray-300 font-medium">
                      Email Us
                    </label>
                    <p className="mt-1">
                      <a
                        href="mailto:hillypix2022@gmail.com"
                        className="text-white"
                      >
                        hillypix2022@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-6">
                <label className="uppercase text-sm text-gray-300 font-medium">
                  Follow Us
                </label>
                <div className="flex gap-4 text-white text-2xl mt-3">
                  <a
                    href="https://www.facebook.com/hillypix.trulyeast/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 underline-none"
                  >
                    <Facebook />
                  </a>

                  <a
                    href="https://x.com/hilly_pix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300"
                  >
                    <Twitter />
                  </a>

                  <a
                    href="https://www.instagram.com/hillypix_entertainment/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Placeholder for Contact Form */}
            <div><ContactForm /></div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-10 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2582394205856!2d93.78759697532386!3d25.807742306701307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746087f8bdd2d7b%3A0xbad1285e3d10865c!2sRQ5R%2B33V%2C%20Ch%C3%BCmoukedima%2C%20Dimapur%2C%20Nagaland!5e1!3m2!1sen!2sin!4v1750137334968!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[350px] md:h-[450px] rounded-lg shadow-lg border-0"
          ></iframe>
        </div>
      </section>

     <Footer />

    </>
  );
}
