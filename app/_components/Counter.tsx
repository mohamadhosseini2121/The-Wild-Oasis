"use client";

import { Guest } from "@prisma/client";
import { useState } from "react";
type props = {
  users: Guest[];
};
export default function Counter({ users }: props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
