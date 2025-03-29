export function colorPriority(priority:string){

  const bgPriority: Record<string, string> = {
    LOW: "bg-[#78cf27]",
    MEDIUM: "bg-[#86ad0d]"
  };

  return bgPriority[priority] || "bg-[#087518]";
 
}