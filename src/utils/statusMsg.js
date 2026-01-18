const msg = {
    
    // 4xx Client Errors
    Bad_Request: 'Bad Request - Invalid input provided',
    Unauthorized: 'Unauthorized - Authentication required',
    Forbidden: 'Forbidden - Access denied',
    Not_Found: 'Not Found - Resource does not exist',
    Method_Not_Allowed: 'Method Not Allowed - HTTP method not supported',
    Request_Timeout: 'Request Timeout - Request took too long',
    Conflict: 'Conflict - Resource already exists',
    Invalid_Credentials: 'Invalid credentials - Email or password incorrect',
    Email_Exists: 'Email already registered',
    Mobile_Exists: 'Mobile number already registered',
    Invalid_Email: 'Invalid email format',
    Invalid_Mobile: 'Invalid mobile number - must be 10 digits',
    Invalid_Pincode: 'Invalid pincode - must be 6 digits',
    Password_Too_Short: 'Password too short - minimum 8 characters',
    Password_Mismatch: 'Password confirmation does not match',
    
    // 5xx Server Errors
    Internal_Server_Error: 'Internal Server Error',
    Service_Unavailable: 'Service temporarily unavailable',
    Gateway_Timeout: 'Gateway Timeout - Service slow to respond',
    Not_Implemented: 'Not Implemented - Feature not available yet',
    
    // User Management
    User_Not_Found: 'User not found',
    User_Already_Active: 'User account already active',
    Account_Suspended: 'Account temporarily suspended',
    
    // Product/Catalog
    Product_Not_Found: 'Product not found',
    Out_Of_Stock: 'Product out of stock',
    Invalid_Product_Id: 'Invalid product ID',
    
    // Cart/Order
    Cart_Empty: 'Shopping cart is empty',
    Invalid_Order_Id: 'Invalid order ID',
    Order_Not_Found: 'Order not found',
    Payment_Failed: 'Payment processing failed',
    Invalid_Payment_Method: 'Invalid payment method',
    
    // Database/Validation
    Database_Error: 'Database connection error',
    Duplicate_Entry: 'Duplicate entry found',
    Validation_Error: 'Input validation failed',
    
    // Security
    Rate_Limit_Exceeded: 'Too many requests - rate limit exceeded',
    CSRF_Token_Invalid: 'Invalid security token',
    
    // Success Messages (optional for status responses)
    Success: 'Request processed successfully',
    Created: 'Resource created successfully',
    Updated: 'Resource updated successfully',
    Deleted: 'Resource deleted successfully'
};


const statusCodes = {
    // 1xx Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    
    // 2xx Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    
    // 3xx Redirection
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    
    // 4xx Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    UNPROCESSABLE_ENTITY: 422,
    
    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};


export { msg, statusCodes }
