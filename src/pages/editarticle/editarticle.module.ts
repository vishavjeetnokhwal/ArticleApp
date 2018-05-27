import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarticlePage } from './editarticle';

@NgModule({
  declarations: [
    EditarticlePage,
  ],
  imports: [
    IonicPageModule.forChild(EditarticlePage),
  ],
})
export class EditarticlePageModule {}
