"use client";

interface HeaderProps {
  session: Session;
}

import { Session } from "next-auth";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import { updateImage } from "@/services/updateImage";
import { getUser } from "@/services/userService";
import { UserPen } from "lucide-react";

function Header({ session }: HeaderProps) {
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const userId = session.user.email;

  const image =
    session.user?.image === ""
      ? "/assets/images/profile.png"
      : session.user?.image;

  const handleSuccess = (result: any) => {
    const secureUrl = result.info.secure_url; // url cloudinary
    if (!secureUrl) return;

    setImageUrl(secureUrl);
  };

  useEffect(() => {
    if (!imageUrl || !userId || isInitialLoad) return;

    const updateProfileImage = async () => {
      try {
        await updateImage(userId, imageUrl);
      } catch (error) {
        console.error("Error update image:", error);
      }
    };

    updateProfileImage();
  }, [imageUrl, userId, isInitialLoad]);

  useEffect(() => {
    const getImageProfile = async () => {
    const imageProfile = await getUser(userId);
    if (imageProfile?.image) {
      setImageUrl(imageProfile.image);
    }
    setIsInitialLoad(false);
  };

    getImageProfile();
  }, []);

  return (
    <header className=" w-full text-orange flex items-end flex-col pt-4  gap-4  ">
      <div className="profile flex p-2 mx-4 gap-4 border border-[#DBF227]  rounded-lg bg-[#9FC131] drop-shadow-md">
        <div className="profile-details  ">
          <p className="font-bold text-black">{session?.user?.name}</p>
          <p className="text-sm text-black"> {session?.user?.email} </p>
        </div>
        <CldUploadButton uploadPreset="bkbmcqnk" onSuccess={handleSuccess} className="relative group">
          <div className=" relative w-14 h-14">
          <Image
            className="rounded-full  w-14 h-14 border-[#DBF227] border-2"
            src={imageUrl || image}
            width={300}
            height={300}
            alt="profile-photo"
          ></Image>
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ">
            <UserPen className="text-white w-6 h-6" />
          </div>
          </div>
        </CldUploadButton>
      </div>
      <div className="w-full h-[1px] bg-[#005C53]"></div>
    </header>
  );
}

export default Header;
