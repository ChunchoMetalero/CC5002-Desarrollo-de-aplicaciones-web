def pages(x):
    if x % 5 == 0:
        return x // 5
    else:
        return x // 5 + 1
    
def products_in_page(page, x):
    last_product_id = x - (page - 1) * 5
    start_id = max(1, last_product_id - 4)
    end_id = last_product_id
    return end_id, start_id
