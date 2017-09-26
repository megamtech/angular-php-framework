/*
 * Copyright (c) 2017 Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */


import {PreloadingStrategy, Route} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class megamPreloader implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preload ? load() : Observable.of(null);
    }
}
