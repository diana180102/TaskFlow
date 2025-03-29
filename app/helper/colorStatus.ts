export  function colorStatus(status:string){

   const bgButton: Record<string, string> = {
      ESTABLISHED: "bg-[#E66E5A]",
      PROGRESS: "bg-[#E6E25A]"
   }
   
   return bgButton[status] || "bg-[#17ad65]"

} 

export function colorStatusTask(status:string){
   const bgButton: Record<string, string> = {
      PENDING: "bg-[#30bb11]",
      PROGRESS: "bg-[#90bd04]"
   }
   
   return bgButton[status] || "bg-[#17ad65]"
}