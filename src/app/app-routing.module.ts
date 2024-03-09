import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app.routing.ts
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./_components/component.module').then((m) => m.ComponentModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
