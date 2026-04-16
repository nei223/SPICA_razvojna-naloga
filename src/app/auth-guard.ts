import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


//preveri ali ima upo pravilne credentials, če ne preusmeri na settings z errr
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);


  //prebere shranjene pod iz local storage
  const clientId = localStorage.getItem('clientId');
  const clientSecret = localStorage.getItem('clientSecret');


  //preveri ali se client id pa secret ujemata z vrednostmi
  
  if (clientId !== 'user123456' || clientSecret !== 'geslo123456') {
    router.navigate(['/settings'], {
      queryParams: { error: 'Wrong client ID or client secret!' }
    });
    return false;
  }

  return true;
};