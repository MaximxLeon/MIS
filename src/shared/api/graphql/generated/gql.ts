/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query MyOrganizations {\n  myOrganizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.MyOrganizationsDocument,
    "query Organizations {\n  organizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.OrganizationsDocument,
};
const documents: Documents = {
    "query MyOrganizations {\n  myOrganizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}": types.MyOrganizationsDocument,
    "query Organizations {\n  organizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}": types.OrganizationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyOrganizations {\n  myOrganizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query MyOrganizations {\n  myOrganizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Organizations {\n  organizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query Organizations {\n  organizations {\n    id\n    name\n    shortName\n    inn\n    kpp\n    ogrn\n    legalAddress\n    phone\n    email\n    website\n    createdAt\n    updatedAt\n    owners {\n      id\n      email\n      phoneNumber\n      family\n      name\n      patronymic\n      fio\n      birthDate\n      createdAt\n      updatedAt\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;