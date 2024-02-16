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

// get workflow properties object
import { IAutomationStatus } from "./IAutomationStatus";
import { IStepInfo } from "./IStepInfo";
import { IVariableInfo } from "./IVariableInfo";

/**
 * Interface for z/OSMF API response.
 * @export
 * @interface IWorkflowsInfo
 */
export interface IWorkflowInfo {
    /**
     * Unique workflow name.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowName?: string;

    /**
     * Unique workflow key generated by z/OSMF.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowKey?: string;

    /**
     * Description of workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowDescription?: string;

    /**
     * Short ID that identifies the workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowID?: string;

    /**
     * Version of the workflow definition file.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowVersion?: string;

    /**
     * 128bit hash associated with definition file.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    workflowDefinitionFileMD5Value?: string;

    /**
     * Name of the vendor.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    vendor?: string;

    /**
     * User ID of the workflow owner.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    owner?: string;

    /**
     * Full name of z/OS system.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    system?: string;

    /**
     * Category of workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    category?: string;

    /**
     * Identifier of product configured via workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    productID?: string;

    /**
     * Name of the product configured via workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    productName?: string;

    /**
     * Version of the product configured via workflow.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    productVersion?: string;

    /**
     * Percentage of the  product configured via workflow.
     * @type {number}
     * @memberof IWorkflowInfo
     */
    percentComplete?: number;

    /**
     * Indicates if workflow can be called by other workflow.
     * @type {boolean}
     * @memberof IWorkflowInfo
     */
    isCallable?: boolean;

    /**
     * Indicates if workflow steps can run in parallel.
     * @type {boolean}
     * @memberof IWorkflowInfo
     */
    containsParallelSteps?: boolean;

    /**
     * Restrict a workflow to one instance only.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    scope?: string;

    /**
     * Current workflow status.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    statusName?: string;

    /**
     * JOB delete after successfull complete.
     * @type {boolean}
     * @memberof IWorkflowInfo
     */
    deleteCompletedJobs?: boolean;

    /**
     * Details about most recent start request.
     * @type {IAutomationStatus}
     * @memberof IWorkflowInfo
     */
    automationStatus?: IAutomationStatus;

    /**
     * Account info in JCL JOB.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    accountInfo?: string;

    /**
     * JOB statement in JCL JOB.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    jobStatement?: string;

    /**
     * Uniq identifier for the template.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    templateID?: string;

    /**
     * Action ID for the action object.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    actionID?: string;

    /**
     * ID of software service registry.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    registryID?: string;

    /**
     * ID of software instance parent registry.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    parentRegistryID?: string;

    /**
     * Template domain ID.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    domainID?: string;

    /**
     * ID of the tenant in resource pool.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    tenantID?: string;

    /**
     * Created software instance name.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    softwareServiceInstanceName?: string;

    /**
     * Name of the template.
     * @type {string}
     * @memberof IWorkflowInfo
     */
    templateName?: string;

    /**
     * Aray of one or more step-info object.
     * @type {IStepInfo[]}
     * @memberof IWorkflowInfo
     */
    steps?: IStepInfo[];

    /**
     * Aray of one or more variable-info object.
     * @type {IVariableInfo[]}
     * @memberof IWorkflowInfo
     */
    variables?: IVariableInfo[];

    /**
     * Workflow's access type.
     * @type {IVariableInfo[]}
     * @memberof IWorkflowInfo
     */
    access?: string;
    // softwareType: string;
}