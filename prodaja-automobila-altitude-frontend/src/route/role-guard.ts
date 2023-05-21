export function checkRoles(userRole: string, requiredRoles: string[]):  boolean{
  for(let requiredRole of requiredRoles){
    if(userRole === (requiredRole)){
        return true;
    }
  }
  return false;
}