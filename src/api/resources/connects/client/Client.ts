/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Chariot from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace Connects {
    interface Options {
        environment?: core.Supplier<environments.ChariotEnvironment | environments.ChariotEnvironmentUrls>;
        token?: core.Supplier<core.BearerToken | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class Connects {
    constructor(protected readonly _options: Connects.Options = {}) {}

    /**
     * Get or create a Connect object. Only one Connect object can be created per Nonprofit for a given Fundraising Application. If one already exists, this will return a 200 status with the existing object. The returned Connect can be used to integrate the client-side Chariot Connect component using the id property (CID) and also query for data generated from the Chariot Connect instance from the Chariot API using the apiKey property.
     *
     * @param {Chariot.ConnectsCreateRequest} request
     * @param {Connects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Chariot.BadRequestError}
     * @throws {@link Chariot.UnauthorizedError}
     * @throws {@link Chariot.ForbiddenError}
     * @throws {@link Chariot.NotFoundError}
     * @throws {@link Chariot.InternalServerError}
     *
     * @example
     *     await client.connects.create({
     *         nonprofit: "6af3f58e-7a80-4997-8259-770c033d7d3a",
     *         suborganization: "c00d1aa2-09ab-4e76-8461-7ac34578a70c"
     *     })
     */
    public async create(
        request: Chariot.ConnectsCreateRequest,
        requestOptions?: Connects.RequestOptions
    ): Promise<Chariot.Connect> {
        const { nonprofit, suborganization, ..._body } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        _queryParams["nonprofit"] = nonprofit;
        if (suborganization != null) {
            _queryParams["suborganization"] = suborganization;
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                ((await core.Supplier.get(this._options.environment)) ?? environments.ChariotEnvironment.Production)
                    .api,
                "v1/connects"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "chariot-typescript-sdk",
                "X-Fern-SDK-Version": "0.0.1-alpha1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            body: serializers.ConnectsCreateRequest.jsonOrThrow(_body, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Connect.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Chariot.BadRequestError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 401:
                    throw new Chariot.UnauthorizedError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 403:
                    throw new Chariot.ForbiddenError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 404:
                    throw new Chariot.NotFoundError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Chariot.InternalServerError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                default:
                    throw new errors.ChariotError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.ChariotError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.ChariotTimeoutError();
            case "unknown":
                throw new errors.ChariotError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Get a Connect object with the unique identifier (CID)
     *
     * @param {string} id - the unique id of the connect
     * @param {Connects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Chariot.BadRequestError}
     * @throws {@link Chariot.UnauthorizedError}
     * @throws {@link Chariot.ForbiddenError}
     * @throws {@link Chariot.NotFoundError}
     * @throws {@link Chariot.InternalServerError}
     *
     * @example
     *     await client.connects.get("live_xJd0lUrvpDkzeGBWZbuI2wbvEdM")
     */
    public async get(id: string, requestOptions?: Connects.RequestOptions): Promise<Chariot.Connect> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                ((await core.Supplier.get(this._options.environment)) ?? environments.ChariotEnvironment.Production)
                    .api,
                `v1/connects/${encodeURIComponent(id)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "chariot-typescript-sdk",
                "X-Fern-SDK-Version": "0.0.1-alpha1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Connect.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Chariot.BadRequestError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 401:
                    throw new Chariot.UnauthorizedError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 403:
                    throw new Chariot.ForbiddenError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 404:
                    throw new Chariot.NotFoundError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Chariot.InternalServerError(
                        serializers.Error_.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                default:
                    throw new errors.ChariotError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.ChariotError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.ChariotTimeoutError();
            case "unknown":
                throw new errors.ChariotError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
