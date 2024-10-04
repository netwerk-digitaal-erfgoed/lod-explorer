"use client";

import React, { useEffect, useState } from "react";
import CardItem from "@/components/CardItem";
import getAllClasses from "@/lib/getAllClasses";

export default function Home() {
  const [classes, setClasses] = useState([]);

  // const [classes, setClasses] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await getAllClasses();
      setClasses(res.data);
    };
    getData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {classes.map((item: any, i: any) => (
        <div key={i} className="grid gap-4 ">
          <CardItem
            title={item.name}
            description={item.iriType}
            goPage={"/explore/" + item._id}
          ></CardItem>
        </div>
      ))}
    </div>
  );
}
