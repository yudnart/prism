import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  tablerLayoutSidebarLeftCollapse,
  tablerLayoutSidebarLeftExpand,
} from '@ng-icons/tabler-icons';
import {
  heroArrowLeftCircleMini,
  heroArrowRightCircleMini,
} from '@ng-icons/heroicons/mini';
import {
  heroBars3Solid,
  heroChartBarSolid,
  heroCubeSolid,
  heroMapSolid,
  heroSquare3Stack3dSolid,
  heroTagSolid,
  heroUserGroupSolid,
  heroUsersSolid,
} from '@ng-icons/heroicons/solid';
@NgModule({
  declarations: [],
  imports: [
    NgIconsModule.withIcons({
      heroArrowLeftCircleMini,
      heroArrowRightCircleMini,
      heroBars3Solid,
      heroChartBarSolid,
      heroCubeSolid,
      heroMapSolid,
      heroSquare3Stack3dSolid,
      heroTagSolid,
      heroUserGroupSolid,
      heroUsersSolid,
      tablerLayoutSidebarLeftCollapse,
      tablerLayoutSidebarLeftExpand,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
