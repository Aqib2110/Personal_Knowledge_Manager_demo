"use client";
import React from "react";
import { Folder, Lightbulb, PinIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import { File,FileTypeIcon,FileText,BookOpen } from "lucide-react";
import { PlusCircle,CheckCircle,UploadIcon } from "lucide-react";
import Hero from "./Hero";
import Content from "./Content";
const Home = () => {
  return (
    <div className=" overflow-auto flex flex-col mt-[60px]">
      <Hero />
      <Content />
    </div>
  );
};

export default Home;
