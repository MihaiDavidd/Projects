from browser import Browser

def before_all(context):
    print("Setting the browser!!")
    context.browser = Browser()
