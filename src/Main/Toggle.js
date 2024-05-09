import React from "react";

const Toggle = () => {
  return (
    <label for="toggleA" class="flex cursor-pointer items-center">
      <div class="relative">
        <input id="toggleA" type="checkbox" class="sr-only" />
        <div class="h-5 w-8 rounded-full bg-gray-400 shadow-inner"></div>
        <div class="dot absolute -left-1 top-0 h-5 w-5 rounded-full bg-white shadow transition"></div>
      </div>
    </label>
  );
};

export default Toggle;
