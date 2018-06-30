function netPay(basicPay)
{
    var grossPay;
    if(basicPay>50000)
    {
        grossPay=basicPay+(0.4*basicPay);
    }
    else{
        grossPay=basicPay+(0.3*basicPay);
    }
    return (grossPay-1000);

}
module.exports.netPay=netPay;