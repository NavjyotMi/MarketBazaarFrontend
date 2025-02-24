import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#121519" }} className="mt-4 text-white">
      <div className="flex flex-col mt-4 text-white p-10 w-full space-y-3">
        {/* for upper part */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-3">
            <div>
              <h1>.SUPPORT</h1>
            </div>
            <div className="text-gray-400 space-y-1">
              <a href="#" className="block ">
                Unsubscribe
              </a>
              <a href="#" className="block ">
                Reservation
              </a>
              <a href="#" className="block ">
                Contact Us
              </a>
              <a href="#" className="block ">
                Feedback
              </a>
              <a href="#" className="block ">
                Help
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <h1>.POLICIES</h1>
            </div>
            <div className="text-gray-400 space-y-1">
              <a href="#" className="block ">
                Gift card conditions
              </a>
              <a href="#" className="block ">
                Privacy Policy
              </a>
              <a href="#" className="block ">
                Terms of use
              </a>
              <a href="#" className="block ">
                Shipping
              </a>
              <a href="#" className="block ">
                Return
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <h1>.POLICIES</h1>
            </div>
            <div className="text-gray-400 space-y-1">
              <a href="#" className="block ">
                Gift card conditions
              </a>
              <a href="#" className="block ">
                Privacy Policy
              </a>
              <a href="#" className="block ">
                Terms of use
              </a>
              <a href="#" className="block ">
                Shipping
              </a>
              <a href="#" className="block ">
                Return
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <h1>.MARKETBAZAAR</h1>
            </div>
            <div className="text-gray-400 space-y-1">
              <div style={{ color: "#999999" }}>301 The Greenhoue London,</div>
              <div style={{ color: "#999999" }}>E2 8DY UK</div>
              <a href="#" className="block ">
                support@domain.com
              </a>
              <div></div>
              <a href="#" className="block ">
                987988789
              </a>
              <a href="#" className="block ">
                <div>Icons here</div>
              </a>
            </div>
          </div>
        </div>
        {/* for lower part */}
        <div className="flex flex-column space-between">
          <div style={{ color: "#999999" }}>©2024 copyright</div>
          {/* <div>hello</div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
