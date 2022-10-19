//  Take a function as input and if catch pass to next
function catchAsync(func){
    return (res, req, next)=>{
        func(res, req, next).catch(next);
    }
}

module.exports = catchAsync;