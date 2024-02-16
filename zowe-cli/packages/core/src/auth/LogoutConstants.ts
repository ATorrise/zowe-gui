/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/


/**
 * Class for various logout constants.
 * @export
 * @class LogoutConstants
 */
export class LogoutConstants {


    /**
     * URI base jobs API
     * @static
     * @type {string}
     * @memberof LogoutConstants
     */
    public static readonly APIML_V1_RESOURCE: string = "/gateway/api/v1/auth/logout";

    /**
     * Zowe Token Expired Error Code
     * @static
     * @type {string}
     * @memberof LogoutConstants
     */
    public static readonly APIML_V1_TOKEN_EXP_ERR: string = "TokenExpireException";

    /**
     * Zowe Token Expired Error Codes
     * @static
     * @type {string}
     * @memberof LogoutConstants
     */
    public static readonly APIML_V2_LOGOUT_ERR_LIST: {[key:string]: string} = {
        V1_TOKEN_EXPIRED: LogoutConstants.APIML_V1_TOKEN_EXP_ERR,
        V2_TOKEN_EXPIRED: "org.zowe.apiml.security.expiredToken",
        V2_TOKEN_INVALID: "org.zowe.apiml.security.query.invalidToken",
        V2_TOKEN_MISSING: "org.zowe.apiml.security.query.tokenNotProvided",
    };
}