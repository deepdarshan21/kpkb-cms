#include<iostream>
#include<cmath>
using namespace std;
long double ln(long double x){
    return log(x);
}
int main(){
    long double p,k;
    int l=2,r=366,mid;
    cin>>p;
    if(p==1){
        cout<<"Atleast "<<366<<" children should be there to have a probability of 1"<<endl;
        return 0;
    }
    if(p==0){
        cout<<"1 child should be there to have a probability of 0"<<endl;
        return 0;
    }
    if(p>1||p<0){
        cout<<"INVALID PROBABILITY";
        return 0;
    }
    //mid=l;
    while(l<r){
        mid=(l+r)/2;
        if((ln(1-p))<0-mid+(365.5-mid)*ln(365)-(365.5-mid)*ln(365-mid)){
            l=mid+1;
        }
        else r=mid;
    }
    cout<<"Atleast "<<l<<" children should be there to have a probality of "<<p<<endl;
}