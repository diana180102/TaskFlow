"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import { setAddUser, setLoginUser } from "@/redux/userSlice";
import { faGooglePlus, faSquareGithub} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';

import { signIn, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";

function Login() {

  const { data: session } = useSession();
  const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

   useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  function handleChange (e: ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setFormData((prevData) =>({
      ...prevData,
      [name]: value
    }) );
  }


  

 async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
     

     try {

      const result = await signIn("credentials", {
        email:formData.email,
        password: formData.password,
        redirect: false
      });

      if(result?.error){
        throw new Error(result.error);
      }

       dispatch(setAddUser({ fullName: formData.fullName, email: formData.email, password: formData.password }));

        
     } catch (error) {
       console.log(error);
     }
  
  }
  
  
  return (
    <div className="bg-slate-200 h-full flex justify-center items-center p-4">
      <section className="container-register bg-white  lg:w-[700px]  flex flex-col-reverse lg:flex-row rounded-xl shadow-md">
        {/* FORM */}
        <div className="container-form p-8 lg:w-1/2">
          <form className="max-w-sm mx-auto flex flex-col justify-center mb-4" onSubmit={handleSubmit}>
            
                {/* email */}
             <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@flowbite.com"
                required
              />
            </div>
            {/* password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button className="btn-cyan ">Login</Button>

            
            
            
          </form>

           <div className="flex flex-row gap-3 justify-center items-center">
            <div className="h-[1px] w-full bg-slate-200"></div>
             <p className="font-bold">OR </p>
             <div className="h-[1px] w-full bg-slate-200"></div>
           </div>

           <div className="container-btn flex gap-2 w-full justify-center items-center mt-4">
             <Button  onClick={(e) => {
                e.preventDefault(); // Evitar el envío del formulario
               signIn("google", { callbackUrl: "/dashboard" });
              }} className="btn-red p-2 text-2xl lg:text-xl"> <FontAwesomeIcon icon={faGooglePlus} className="text-2xl" /> Google</Button>
             <Button  onClick={(e) => {
                e.preventDefault(); // Evitar el envío del formulario
               signIn("github", { callbackUrl: "/dashboard" });
              }} className="btn-dark p-2 text-2xl lg:text-xl"><FontAwesomeIcon icon={faSquareGithub}  className="text-2xl"/> GitHub</Button>
           </div>
           <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                      Don't have an account? <Link href="/auth/register" className="font-bold text-blue-500 hover:underline dark:text-primary-500">Register here</Link>
            </p>
        </div>
        {/* IMAGE */}
        <div className="container-image bg-[#1c2135] flex justify-center items-center lg:w-1/2  rounded-t-lg lg:rounded-r-lg">
             <Image 
            src={"/assets/images/task1.png"} 
            alt="image-home" 
            width={300} 
            height={900} 
            className={`w-full`}></Image>
        </div>
        
      </section>
    </div>
  );
}

export default Login;
