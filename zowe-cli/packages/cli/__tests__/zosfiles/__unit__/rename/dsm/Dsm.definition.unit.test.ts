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

import i18nEnglish from "../../../../../src/zosfiles/-strings-/en";
import { DsmDefinition } from "../../../../../src/zosfiles/rename/dsm/Dsm.definition";

describe("DsmDefinition", () => {
    it("should use the correct object for strings", () => {
        const strings = i18nEnglish.RENAME.ACTIONS.DATA_SET_MEMBER;

        expect(DsmDefinition.description).toBe(strings.DESCRIPTION);
        expect(DsmDefinition.children).toBeUndefined();
        expect(DsmDefinition.profile.optional).toEqual(["zosmf"]);
        expect(DsmDefinition.options).toBeUndefined();
        expect(DsmDefinition.examples).toMatchSnapshot();
        expect(DsmDefinition.description).toBe(strings.DESCRIPTION);
    });
});
