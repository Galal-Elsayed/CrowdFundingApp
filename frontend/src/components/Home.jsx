import React from "react";
import Api from "../endpoints/Api";

export default function Home() {
  return (
    <div>
      <h1>{Api.message}</h1>
    </div>
  );
}
