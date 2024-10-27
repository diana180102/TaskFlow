"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import { faGooglePlus, faSquareGithub} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

function Register() {

   function handleSubmit (){
    const data = (formData: FormData) =>{

    }
  }

  return (
    <div className="bg-slate-200 h-full flex justify-center items-center p-4">
      <section className="container-register bg-white  w-[700px]  flex flex-col-reverse lg:flex-row rounded-xl shadow-md">
        {/* FORM */}
        <div className="container-form p-8 lg:w-1/2">
          <form className="max-w-sm mx-auto flex flex-col justify-center mb-4" action={handleSubmit}>
            {/* Full Name*/}
            <div className="mb-5">
              <label
                htmlFor="full"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Full Name
              </label>
              <Input
                type="text"
                id="fullname"
                placeholder="Pepito Perez"
                required
              />
            </div>
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
                
                required
              />
            </div>

            <Button className="btn-cyan " type="submit">Register Now</Button>

            
            
            
          </form>

           <div className="flex flex-row gap-3 justify-center items-center">
            <div className="h-[1px] w-full bg-slate-200"></div>
             <p className="font-bold">OR </p>
             <div className="h-[1px] w-full bg-slate-200"></div>
           </div>

           <div className="container-btn flex gap-2 w-full justify-center items-center mt-4">
             <Button className="btn-red p-2 text-2xl lg:text-xl"> <FontAwesomeIcon icon={faGooglePlus} className="text-2xl" /> Google</Button>
             <Button className="btn-dark p-2 text-2xl lg:text-xl"><FontAwesomeIcon icon={faSquareGithub}  className="text-2xl"/> GitHub</Button>
           </div>
           <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                      Already have an account? <Link href="/auth/login" className="font-bold text-blue-500 hover:underline dark:text-primary-500">Login here</Link>
            </p>
        </div>
        {/* IMAGE */}
        <div className="container-image bg-[#1c2135] flex justify-center items-center lg:w-1/2  rounded-t-lg lg:rounded-r-lg">
             <Image 
            src={"/assets/images/task3.png"} 
            alt="image-home" 
            width={300} 
            height={900} 
            className={`w-full`}></Image>
        </div>
        
      </section>
    </div>
  );
}

export default Register;
