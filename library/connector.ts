import { AbstractPowerSyncDatabase, PowerSyncBackendConnector, RNQSPowerSyncDatabaseOpenFactory } from '@journeyapps/powersync-sdk-react-native';
import {API_BASE_URL} from "@env";

export class BackendConnector implements PowerSyncBackendConnector {
    baseUrl: string;
    headers: any;

    constructor() {
        console.log(`connector instantiating, url is ${API_BASE_URL}`);
        this.baseUrl = process.env.API_BASE_URL;
        this.headers = {
            "Content-Type": "application/json"
        }
    }
    async fetchCredentials() {
        console.log("fetching credentials!");
        const response = await fetch(`${this.baseUrl}/api/get_token/`, {
            method: "GET",
            headers: this.headers
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
        const session = await response.json();
        if (!session.token || !session.powersync_url) {
            console.log("API must return powersync_url and token");
            console.log("got:", session);
        }
        return {
            endpoint: session.powersync_url,
            token: session.token ?? '',
            expiresAt: undefined,
            userID: 4
        }
    };
    async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
        console.log("uploadData called! No code here yet");
    }
    private parseJwt (token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      }
}
