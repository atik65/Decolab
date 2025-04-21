import React from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CheckoutForm = () => {
  return (
    <div className="space-y-8  ">
      {/* Contact Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <Input
          type="text"
          placeholder="Email or mobile phone number"
          className="w-full mb-4"
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="newsletter" className="rounded" />
          <label htmlFor="newsletter">Email me with news and offers</label>
        </div>
      </div>

      {/* Delivery Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Delivery</h2>
        <Select defaultValue="Kuwait">
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kuwait">Kuwait</SelectItem>
            <SelectItem value="Egypt">Egypt</SelectItem>
            <SelectItem value="Sudan">Sudan</SelectItem>
            <SelectItem value="Morocco">Morocco</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            type="text"
            placeholder="First name (optional)"
            className="w-full"
          />
          <Input type="text" placeholder="Last name" className="w-full" />
        </div>

        <Input type="text" placeholder="Address" className="w-full mt-4" />
        <Input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full mt-4"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            type="text"
            placeholder="Postal code (optional)"
            className="w-full"
          />
          <Input type="text" placeholder="City" className="w-full" />
        </div>

        {/* phone number */}
        <div className="mt-4">
          <Input
            type="number"
            placeholder="Phone number"
            name="phone"
            id="phone"
            className="w-full"
          />
        </div>

        <div className="mt-4">
          <Select defaultValue="Hawalli">
            <SelectTrigger>
              <SelectValue placeholder="Select governorate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hawalli">Hawalli</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
