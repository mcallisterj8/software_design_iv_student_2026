import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Unicast } from './components/unicast/unicast';
import { AsyncPipeExample } from './components/async-pipe-example/async-pipe-example';
import { SubjectMulticasting } from './components/subject-multicasting/subject-multicasting';
import { PipeAndOperators } from './components/pipe-and-operators/pipe-and-operators';
import { RequestData } from './components/request-data/request-data';
import { DisplayData } from './components/display-data/display-data';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'unicast', component: Unicast },
  { path: 'async', component: AsyncPipeExample },
  { path: 'subject-multicast', component: SubjectMulticasting },
  { path: 'pipe-and-operators', component: PipeAndOperators },
  { path: 'request', component: RequestData },
  { path: 'display', component: DisplayData },
];
