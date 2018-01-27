import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-session.service';
import { JhiTrackerService } from '../tracker/tracker.service';

@Injectable()
export class LoginService {

    constructor(
        private principal: Principal,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider
    ) {}

    login() {
        let port = (location.port ? ':' + location.port : '');
        if (port === ':9000') {
            port = ':11000';
        }
        location.href = '//' + location.hostname + port + '/login';
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}
