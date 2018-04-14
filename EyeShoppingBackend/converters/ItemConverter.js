var ItemConverter = {
    convertItemsWithStore: function(items, callback) {
        var results = []

        items.forEach(function (row) {
            var currentResult = {}
            var item = {}
            var store = {}

            store.id = row.id
            store.store_name = row.store_name
            store.description = row.description
            store.merchant_id = row.merchant_id

            item.id = row.id
            item.item_name = row.item_name
            item.addressLine1 = row.addressLine1
            item.amount = row.amount
            item.description = row.description

            currentResult.id = row.idStoreItem
            currentResult.item = item
            currentResult.store = store

            results.push(currentResult)
        })

        callback(results)
    }
}

module.exports = ItemConverter