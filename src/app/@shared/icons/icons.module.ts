import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroBars3Solid,
  heroChartBarSolid,
  heroCubeSolid,
  heroMapSolid,
  heroSquare3Stack3dSolid,
  heroTagSolid,
  heroUsersSolid,
} from '@ng-icons/heroicons/solid';
@NgModule({
  declarations: [],
  imports: [
    NgIconsModule.withIcons({
      heroBars3Solid,
      heroChartBarSolid,
      heroCubeSolid,
      heroMapSolid,
      heroSquare3Stack3dSolid,
      heroTagSolid,
      heroUsersSolid,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
