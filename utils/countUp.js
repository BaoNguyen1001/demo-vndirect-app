import React from "react";

function countUp(time) {
  let result = "now";
  const currentDate = new Date();
  result = Math.floor((currentDate - time)/1000/60/60/24/30);
  if(result >= 1) return result + "m";

  result = Math.floor((currentDate - time)/1000/60/60/24);
  if(result >= 1) return result + "d";

  result = Math.floor((currentDate - time)/1000/60/60);
  if(result >= 1) return result + "h";

  result = Math.floor((currentDate - time)/1000/60);
  if(result >= 1) return result + "m";

  return "now";
}

export default countUp;
