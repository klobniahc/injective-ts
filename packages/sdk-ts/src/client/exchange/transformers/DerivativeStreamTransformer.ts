import {
  StreamOrderbookResponse,
  StreamTradesResponse,
  StreamPositionsResponse,
  StreamOrdersResponse,
} from '@injectivelabs/exchange-api/injective_derivative_exchange_rpc_pb'
import { StreamOperation } from '../../../types/index'
import { DerivativeGrpcTransformer } from './DerivativeGrpcTransformer'

export class DerivativeStreamTransformer {
  static orderbookStreamCallback = (response: StreamOrderbookResponse) => {
    const orderbook = response.getOrderbook()

    return {
      orderbook: orderbook
        ? DerivativeGrpcTransformer.grpcOrderbookToOrderbook({
            buys: orderbook.getBuysList(),
            sells: orderbook.getSellsList(),
          })
        : undefined,
      operation: response.getOperationType() as StreamOperation,
      marketId: response.getMarketId(),
      timestamp: response.getTimestamp(),
    }
  }

  static tradesStreamCallback = (response: StreamTradesResponse) => {
    const trade = response.getTrade()

    return {
      trade: trade
        ? DerivativeGrpcTransformer.grpcTradeToTrade(trade)
        : undefined,
      operation: response.getOperationType() as StreamOperation,
      timestamp: response.getTimestamp(),
    }
  }

  static positionStreamCallback = (response: StreamPositionsResponse) => {
    const position = response.getPosition()

    return {
      position: position
        ? DerivativeGrpcTransformer.grpcPositionToPosition(position)
        : undefined,
      timestamp: response.getTimestamp(),
    }
  }

  static ordersStreamCallback = (response: StreamOrdersResponse) => {
    const order = response.getOrder()

    return {
      order: order
        ? DerivativeGrpcTransformer.grpcOrderToOrder(order)
        : undefined,
      operation: response.getOperationType() as StreamOperation,
      timestamp: response.getTimestamp(),
    }
  }
}