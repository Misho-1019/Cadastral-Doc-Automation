
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DescriptionHistory
 * 
 */
export type DescriptionHistory = $Result.DefaultSelection<Prisma.$DescriptionHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DescriptionHistories
 * const descriptionHistories = await prisma.descriptionHistory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DescriptionHistories
   * const descriptionHistories = await prisma.descriptionHistory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.descriptionHistory`: Exposes CRUD operations for the **DescriptionHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DescriptionHistories
    * const descriptionHistories = await prisma.descriptionHistory.findMany()
    * ```
    */
  get descriptionHistory(): Prisma.DescriptionHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DescriptionHistory: 'DescriptionHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "descriptionHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DescriptionHistory: {
        payload: Prisma.$DescriptionHistoryPayload<ExtArgs>
        fields: Prisma.DescriptionHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DescriptionHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DescriptionHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          findFirst: {
            args: Prisma.DescriptionHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DescriptionHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          findMany: {
            args: Prisma.DescriptionHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>[]
          }
          create: {
            args: Prisma.DescriptionHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          createMany: {
            args: Prisma.DescriptionHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DescriptionHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>[]
          }
          delete: {
            args: Prisma.DescriptionHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          update: {
            args: Prisma.DescriptionHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          deleteMany: {
            args: Prisma.DescriptionHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DescriptionHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DescriptionHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>[]
          }
          upsert: {
            args: Prisma.DescriptionHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DescriptionHistoryPayload>
          }
          aggregate: {
            args: Prisma.DescriptionHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDescriptionHistory>
          }
          groupBy: {
            args: Prisma.DescriptionHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DescriptionHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DescriptionHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<DescriptionHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    descriptionHistory?: DescriptionHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model DescriptionHistory
   */

  export type AggregateDescriptionHistory = {
    _count: DescriptionHistoryCountAggregateOutputType | null
    _min: DescriptionHistoryMinAggregateOutputType | null
    _max: DescriptionHistoryMaxAggregateOutputType | null
  }

  export type DescriptionHistoryMinAggregateOutputType = {
    id: string | null
    documentType: string | null
    identifier: string | null
    description: string | null
    userId: string | null
    fileName: string | null
    createdAt: Date | null
  }

  export type DescriptionHistoryMaxAggregateOutputType = {
    id: string | null
    documentType: string | null
    identifier: string | null
    description: string | null
    userId: string | null
    fileName: string | null
    createdAt: Date | null
  }

  export type DescriptionHistoryCountAggregateOutputType = {
    id: number
    documentType: number
    identifier: number
    description: number
    userId: number
    extractedData: number
    validationErrors: number
    performance: number
    fileName: number
    createdAt: number
    _all: number
  }


  export type DescriptionHistoryMinAggregateInputType = {
    id?: true
    documentType?: true
    identifier?: true
    description?: true
    userId?: true
    fileName?: true
    createdAt?: true
  }

  export type DescriptionHistoryMaxAggregateInputType = {
    id?: true
    documentType?: true
    identifier?: true
    description?: true
    userId?: true
    fileName?: true
    createdAt?: true
  }

  export type DescriptionHistoryCountAggregateInputType = {
    id?: true
    documentType?: true
    identifier?: true
    description?: true
    userId?: true
    extractedData?: true
    validationErrors?: true
    performance?: true
    fileName?: true
    createdAt?: true
    _all?: true
  }

  export type DescriptionHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DescriptionHistory to aggregate.
     */
    where?: DescriptionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DescriptionHistories to fetch.
     */
    orderBy?: DescriptionHistoryOrderByWithRelationInput | DescriptionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DescriptionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DescriptionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DescriptionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DescriptionHistories
    **/
    _count?: true | DescriptionHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DescriptionHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DescriptionHistoryMaxAggregateInputType
  }

  export type GetDescriptionHistoryAggregateType<T extends DescriptionHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDescriptionHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDescriptionHistory[P]>
      : GetScalarType<T[P], AggregateDescriptionHistory[P]>
  }




  export type DescriptionHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DescriptionHistoryWhereInput
    orderBy?: DescriptionHistoryOrderByWithAggregationInput | DescriptionHistoryOrderByWithAggregationInput[]
    by: DescriptionHistoryScalarFieldEnum[] | DescriptionHistoryScalarFieldEnum
    having?: DescriptionHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DescriptionHistoryCountAggregateInputType | true
    _min?: DescriptionHistoryMinAggregateInputType
    _max?: DescriptionHistoryMaxAggregateInputType
  }

  export type DescriptionHistoryGroupByOutputType = {
    id: string
    documentType: string
    identifier: string | null
    description: string
    userId: string | null
    extractedData: JsonValue | null
    validationErrors: JsonValue | null
    performance: JsonValue | null
    fileName: string | null
    createdAt: Date
    _count: DescriptionHistoryCountAggregateOutputType | null
    _min: DescriptionHistoryMinAggregateOutputType | null
    _max: DescriptionHistoryMaxAggregateOutputType | null
  }

  type GetDescriptionHistoryGroupByPayload<T extends DescriptionHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DescriptionHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DescriptionHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DescriptionHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], DescriptionHistoryGroupByOutputType[P]>
        }
      >
    >


  export type DescriptionHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentType?: boolean
    identifier?: boolean
    description?: boolean
    userId?: boolean
    extractedData?: boolean
    validationErrors?: boolean
    performance?: boolean
    fileName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["descriptionHistory"]>

  export type DescriptionHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentType?: boolean
    identifier?: boolean
    description?: boolean
    userId?: boolean
    extractedData?: boolean
    validationErrors?: boolean
    performance?: boolean
    fileName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["descriptionHistory"]>

  export type DescriptionHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentType?: boolean
    identifier?: boolean
    description?: boolean
    userId?: boolean
    extractedData?: boolean
    validationErrors?: boolean
    performance?: boolean
    fileName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["descriptionHistory"]>

  export type DescriptionHistorySelectScalar = {
    id?: boolean
    documentType?: boolean
    identifier?: boolean
    description?: boolean
    userId?: boolean
    extractedData?: boolean
    validationErrors?: boolean
    performance?: boolean
    fileName?: boolean
    createdAt?: boolean
  }

  export type DescriptionHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentType" | "identifier" | "description" | "userId" | "extractedData" | "validationErrors" | "performance" | "fileName" | "createdAt", ExtArgs["result"]["descriptionHistory"]>

  export type $DescriptionHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DescriptionHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentType: string
      identifier: string | null
      description: string
      userId: string | null
      extractedData: Prisma.JsonValue | null
      validationErrors: Prisma.JsonValue | null
      performance: Prisma.JsonValue | null
      fileName: string | null
      createdAt: Date
    }, ExtArgs["result"]["descriptionHistory"]>
    composites: {}
  }

  type DescriptionHistoryGetPayload<S extends boolean | null | undefined | DescriptionHistoryDefaultArgs> = $Result.GetResult<Prisma.$DescriptionHistoryPayload, S>

  type DescriptionHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DescriptionHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DescriptionHistoryCountAggregateInputType | true
    }

  export interface DescriptionHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DescriptionHistory'], meta: { name: 'DescriptionHistory' } }
    /**
     * Find zero or one DescriptionHistory that matches the filter.
     * @param {DescriptionHistoryFindUniqueArgs} args - Arguments to find a DescriptionHistory
     * @example
     * // Get one DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DescriptionHistoryFindUniqueArgs>(args: SelectSubset<T, DescriptionHistoryFindUniqueArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DescriptionHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DescriptionHistoryFindUniqueOrThrowArgs} args - Arguments to find a DescriptionHistory
     * @example
     * // Get one DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DescriptionHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DescriptionHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DescriptionHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryFindFirstArgs} args - Arguments to find a DescriptionHistory
     * @example
     * // Get one DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DescriptionHistoryFindFirstArgs>(args?: SelectSubset<T, DescriptionHistoryFindFirstArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DescriptionHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryFindFirstOrThrowArgs} args - Arguments to find a DescriptionHistory
     * @example
     * // Get one DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DescriptionHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DescriptionHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DescriptionHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DescriptionHistories
     * const descriptionHistories = await prisma.descriptionHistory.findMany()
     * 
     * // Get first 10 DescriptionHistories
     * const descriptionHistories = await prisma.descriptionHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const descriptionHistoryWithIdOnly = await prisma.descriptionHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DescriptionHistoryFindManyArgs>(args?: SelectSubset<T, DescriptionHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DescriptionHistory.
     * @param {DescriptionHistoryCreateArgs} args - Arguments to create a DescriptionHistory.
     * @example
     * // Create one DescriptionHistory
     * const DescriptionHistory = await prisma.descriptionHistory.create({
     *   data: {
     *     // ... data to create a DescriptionHistory
     *   }
     * })
     * 
     */
    create<T extends DescriptionHistoryCreateArgs>(args: SelectSubset<T, DescriptionHistoryCreateArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DescriptionHistories.
     * @param {DescriptionHistoryCreateManyArgs} args - Arguments to create many DescriptionHistories.
     * @example
     * // Create many DescriptionHistories
     * const descriptionHistory = await prisma.descriptionHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DescriptionHistoryCreateManyArgs>(args?: SelectSubset<T, DescriptionHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DescriptionHistories and returns the data saved in the database.
     * @param {DescriptionHistoryCreateManyAndReturnArgs} args - Arguments to create many DescriptionHistories.
     * @example
     * // Create many DescriptionHistories
     * const descriptionHistory = await prisma.descriptionHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DescriptionHistories and only return the `id`
     * const descriptionHistoryWithIdOnly = await prisma.descriptionHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DescriptionHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DescriptionHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DescriptionHistory.
     * @param {DescriptionHistoryDeleteArgs} args - Arguments to delete one DescriptionHistory.
     * @example
     * // Delete one DescriptionHistory
     * const DescriptionHistory = await prisma.descriptionHistory.delete({
     *   where: {
     *     // ... filter to delete one DescriptionHistory
     *   }
     * })
     * 
     */
    delete<T extends DescriptionHistoryDeleteArgs>(args: SelectSubset<T, DescriptionHistoryDeleteArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DescriptionHistory.
     * @param {DescriptionHistoryUpdateArgs} args - Arguments to update one DescriptionHistory.
     * @example
     * // Update one DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DescriptionHistoryUpdateArgs>(args: SelectSubset<T, DescriptionHistoryUpdateArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DescriptionHistories.
     * @param {DescriptionHistoryDeleteManyArgs} args - Arguments to filter DescriptionHistories to delete.
     * @example
     * // Delete a few DescriptionHistories
     * const { count } = await prisma.descriptionHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DescriptionHistoryDeleteManyArgs>(args?: SelectSubset<T, DescriptionHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DescriptionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DescriptionHistories
     * const descriptionHistory = await prisma.descriptionHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DescriptionHistoryUpdateManyArgs>(args: SelectSubset<T, DescriptionHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DescriptionHistories and returns the data updated in the database.
     * @param {DescriptionHistoryUpdateManyAndReturnArgs} args - Arguments to update many DescriptionHistories.
     * @example
     * // Update many DescriptionHistories
     * const descriptionHistory = await prisma.descriptionHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DescriptionHistories and only return the `id`
     * const descriptionHistoryWithIdOnly = await prisma.descriptionHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DescriptionHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DescriptionHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DescriptionHistory.
     * @param {DescriptionHistoryUpsertArgs} args - Arguments to update or create a DescriptionHistory.
     * @example
     * // Update or create a DescriptionHistory
     * const descriptionHistory = await prisma.descriptionHistory.upsert({
     *   create: {
     *     // ... data to create a DescriptionHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DescriptionHistory we want to update
     *   }
     * })
     */
    upsert<T extends DescriptionHistoryUpsertArgs>(args: SelectSubset<T, DescriptionHistoryUpsertArgs<ExtArgs>>): Prisma__DescriptionHistoryClient<$Result.GetResult<Prisma.$DescriptionHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DescriptionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryCountArgs} args - Arguments to filter DescriptionHistories to count.
     * @example
     * // Count the number of DescriptionHistories
     * const count = await prisma.descriptionHistory.count({
     *   where: {
     *     // ... the filter for the DescriptionHistories we want to count
     *   }
     * })
    **/
    count<T extends DescriptionHistoryCountArgs>(
      args?: Subset<T, DescriptionHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DescriptionHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DescriptionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DescriptionHistoryAggregateArgs>(args: Subset<T, DescriptionHistoryAggregateArgs>): Prisma.PrismaPromise<GetDescriptionHistoryAggregateType<T>>

    /**
     * Group by DescriptionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DescriptionHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DescriptionHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DescriptionHistoryGroupByArgs['orderBy'] }
        : { orderBy?: DescriptionHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DescriptionHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDescriptionHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DescriptionHistory model
   */
  readonly fields: DescriptionHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DescriptionHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DescriptionHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DescriptionHistory model
   */
  interface DescriptionHistoryFieldRefs {
    readonly id: FieldRef<"DescriptionHistory", 'String'>
    readonly documentType: FieldRef<"DescriptionHistory", 'String'>
    readonly identifier: FieldRef<"DescriptionHistory", 'String'>
    readonly description: FieldRef<"DescriptionHistory", 'String'>
    readonly userId: FieldRef<"DescriptionHistory", 'String'>
    readonly extractedData: FieldRef<"DescriptionHistory", 'Json'>
    readonly validationErrors: FieldRef<"DescriptionHistory", 'Json'>
    readonly performance: FieldRef<"DescriptionHistory", 'Json'>
    readonly fileName: FieldRef<"DescriptionHistory", 'String'>
    readonly createdAt: FieldRef<"DescriptionHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DescriptionHistory findUnique
   */
  export type DescriptionHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter, which DescriptionHistory to fetch.
     */
    where: DescriptionHistoryWhereUniqueInput
  }

  /**
   * DescriptionHistory findUniqueOrThrow
   */
  export type DescriptionHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter, which DescriptionHistory to fetch.
     */
    where: DescriptionHistoryWhereUniqueInput
  }

  /**
   * DescriptionHistory findFirst
   */
  export type DescriptionHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter, which DescriptionHistory to fetch.
     */
    where?: DescriptionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DescriptionHistories to fetch.
     */
    orderBy?: DescriptionHistoryOrderByWithRelationInput | DescriptionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DescriptionHistories.
     */
    cursor?: DescriptionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DescriptionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DescriptionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DescriptionHistories.
     */
    distinct?: DescriptionHistoryScalarFieldEnum | DescriptionHistoryScalarFieldEnum[]
  }

  /**
   * DescriptionHistory findFirstOrThrow
   */
  export type DescriptionHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter, which DescriptionHistory to fetch.
     */
    where?: DescriptionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DescriptionHistories to fetch.
     */
    orderBy?: DescriptionHistoryOrderByWithRelationInput | DescriptionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DescriptionHistories.
     */
    cursor?: DescriptionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DescriptionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DescriptionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DescriptionHistories.
     */
    distinct?: DescriptionHistoryScalarFieldEnum | DescriptionHistoryScalarFieldEnum[]
  }

  /**
   * DescriptionHistory findMany
   */
  export type DescriptionHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter, which DescriptionHistories to fetch.
     */
    where?: DescriptionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DescriptionHistories to fetch.
     */
    orderBy?: DescriptionHistoryOrderByWithRelationInput | DescriptionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DescriptionHistories.
     */
    cursor?: DescriptionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DescriptionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DescriptionHistories.
     */
    skip?: number
    distinct?: DescriptionHistoryScalarFieldEnum | DescriptionHistoryScalarFieldEnum[]
  }

  /**
   * DescriptionHistory create
   */
  export type DescriptionHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a DescriptionHistory.
     */
    data: XOR<DescriptionHistoryCreateInput, DescriptionHistoryUncheckedCreateInput>
  }

  /**
   * DescriptionHistory createMany
   */
  export type DescriptionHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DescriptionHistories.
     */
    data: DescriptionHistoryCreateManyInput | DescriptionHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DescriptionHistory createManyAndReturn
   */
  export type DescriptionHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many DescriptionHistories.
     */
    data: DescriptionHistoryCreateManyInput | DescriptionHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DescriptionHistory update
   */
  export type DescriptionHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a DescriptionHistory.
     */
    data: XOR<DescriptionHistoryUpdateInput, DescriptionHistoryUncheckedUpdateInput>
    /**
     * Choose, which DescriptionHistory to update.
     */
    where: DescriptionHistoryWhereUniqueInput
  }

  /**
   * DescriptionHistory updateMany
   */
  export type DescriptionHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DescriptionHistories.
     */
    data: XOR<DescriptionHistoryUpdateManyMutationInput, DescriptionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DescriptionHistories to update
     */
    where?: DescriptionHistoryWhereInput
    /**
     * Limit how many DescriptionHistories to update.
     */
    limit?: number
  }

  /**
   * DescriptionHistory updateManyAndReturn
   */
  export type DescriptionHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * The data used to update DescriptionHistories.
     */
    data: XOR<DescriptionHistoryUpdateManyMutationInput, DescriptionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DescriptionHistories to update
     */
    where?: DescriptionHistoryWhereInput
    /**
     * Limit how many DescriptionHistories to update.
     */
    limit?: number
  }

  /**
   * DescriptionHistory upsert
   */
  export type DescriptionHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the DescriptionHistory to update in case it exists.
     */
    where: DescriptionHistoryWhereUniqueInput
    /**
     * In case the DescriptionHistory found by the `where` argument doesn't exist, create a new DescriptionHistory with this data.
     */
    create: XOR<DescriptionHistoryCreateInput, DescriptionHistoryUncheckedCreateInput>
    /**
     * In case the DescriptionHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DescriptionHistoryUpdateInput, DescriptionHistoryUncheckedUpdateInput>
  }

  /**
   * DescriptionHistory delete
   */
  export type DescriptionHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
    /**
     * Filter which DescriptionHistory to delete.
     */
    where: DescriptionHistoryWhereUniqueInput
  }

  /**
   * DescriptionHistory deleteMany
   */
  export type DescriptionHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DescriptionHistories to delete
     */
    where?: DescriptionHistoryWhereInput
    /**
     * Limit how many DescriptionHistories to delete.
     */
    limit?: number
  }

  /**
   * DescriptionHistory without action
   */
  export type DescriptionHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DescriptionHistory
     */
    select?: DescriptionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DescriptionHistory
     */
    omit?: DescriptionHistoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DescriptionHistoryScalarFieldEnum: {
    id: 'id',
    documentType: 'documentType',
    identifier: 'identifier',
    description: 'description',
    userId: 'userId',
    extractedData: 'extractedData',
    validationErrors: 'validationErrors',
    performance: 'performance',
    fileName: 'fileName',
    createdAt: 'createdAt'
  };

  export type DescriptionHistoryScalarFieldEnum = (typeof DescriptionHistoryScalarFieldEnum)[keyof typeof DescriptionHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type DescriptionHistoryWhereInput = {
    AND?: DescriptionHistoryWhereInput | DescriptionHistoryWhereInput[]
    OR?: DescriptionHistoryWhereInput[]
    NOT?: DescriptionHistoryWhereInput | DescriptionHistoryWhereInput[]
    id?: StringFilter<"DescriptionHistory"> | string
    documentType?: StringFilter<"DescriptionHistory"> | string
    identifier?: StringNullableFilter<"DescriptionHistory"> | string | null
    description?: StringFilter<"DescriptionHistory"> | string
    userId?: StringNullableFilter<"DescriptionHistory"> | string | null
    extractedData?: JsonNullableFilter<"DescriptionHistory">
    validationErrors?: JsonNullableFilter<"DescriptionHistory">
    performance?: JsonNullableFilter<"DescriptionHistory">
    fileName?: StringNullableFilter<"DescriptionHistory"> | string | null
    createdAt?: DateTimeFilter<"DescriptionHistory"> | Date | string
  }

  export type DescriptionHistoryOrderByWithRelationInput = {
    id?: SortOrder
    documentType?: SortOrder
    identifier?: SortOrderInput | SortOrder
    description?: SortOrder
    userId?: SortOrderInput | SortOrder
    extractedData?: SortOrderInput | SortOrder
    validationErrors?: SortOrderInput | SortOrder
    performance?: SortOrderInput | SortOrder
    fileName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type DescriptionHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DescriptionHistoryWhereInput | DescriptionHistoryWhereInput[]
    OR?: DescriptionHistoryWhereInput[]
    NOT?: DescriptionHistoryWhereInput | DescriptionHistoryWhereInput[]
    documentType?: StringFilter<"DescriptionHistory"> | string
    identifier?: StringNullableFilter<"DescriptionHistory"> | string | null
    description?: StringFilter<"DescriptionHistory"> | string
    userId?: StringNullableFilter<"DescriptionHistory"> | string | null
    extractedData?: JsonNullableFilter<"DescriptionHistory">
    validationErrors?: JsonNullableFilter<"DescriptionHistory">
    performance?: JsonNullableFilter<"DescriptionHistory">
    fileName?: StringNullableFilter<"DescriptionHistory"> | string | null
    createdAt?: DateTimeFilter<"DescriptionHistory"> | Date | string
  }, "id">

  export type DescriptionHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    documentType?: SortOrder
    identifier?: SortOrderInput | SortOrder
    description?: SortOrder
    userId?: SortOrderInput | SortOrder
    extractedData?: SortOrderInput | SortOrder
    validationErrors?: SortOrderInput | SortOrder
    performance?: SortOrderInput | SortOrder
    fileName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DescriptionHistoryCountOrderByAggregateInput
    _max?: DescriptionHistoryMaxOrderByAggregateInput
    _min?: DescriptionHistoryMinOrderByAggregateInput
  }

  export type DescriptionHistoryScalarWhereWithAggregatesInput = {
    AND?: DescriptionHistoryScalarWhereWithAggregatesInput | DescriptionHistoryScalarWhereWithAggregatesInput[]
    OR?: DescriptionHistoryScalarWhereWithAggregatesInput[]
    NOT?: DescriptionHistoryScalarWhereWithAggregatesInput | DescriptionHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DescriptionHistory"> | string
    documentType?: StringWithAggregatesFilter<"DescriptionHistory"> | string
    identifier?: StringNullableWithAggregatesFilter<"DescriptionHistory"> | string | null
    description?: StringWithAggregatesFilter<"DescriptionHistory"> | string
    userId?: StringNullableWithAggregatesFilter<"DescriptionHistory"> | string | null
    extractedData?: JsonNullableWithAggregatesFilter<"DescriptionHistory">
    validationErrors?: JsonNullableWithAggregatesFilter<"DescriptionHistory">
    performance?: JsonNullableWithAggregatesFilter<"DescriptionHistory">
    fileName?: StringNullableWithAggregatesFilter<"DescriptionHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DescriptionHistory"> | Date | string
  }

  export type DescriptionHistoryCreateInput = {
    id?: string
    documentType: string
    identifier?: string | null
    description: string
    userId?: string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: string | null
    createdAt?: Date | string
  }

  export type DescriptionHistoryUncheckedCreateInput = {
    id?: string
    documentType: string
    identifier?: string | null
    description: string
    userId?: string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: string | null
    createdAt?: Date | string
  }

  export type DescriptionHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DescriptionHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DescriptionHistoryCreateManyInput = {
    id?: string
    documentType: string
    identifier?: string | null
    description: string
    userId?: string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: string | null
    createdAt?: Date | string
  }

  export type DescriptionHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DescriptionHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    performance?: NullableJsonNullValueInput | InputJsonValue
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DescriptionHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    extractedData?: SortOrder
    validationErrors?: SortOrder
    performance?: SortOrder
    fileName?: SortOrder
    createdAt?: SortOrder
  }

  export type DescriptionHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    createdAt?: SortOrder
  }

  export type DescriptionHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}