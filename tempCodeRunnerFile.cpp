#include<bits/stdc++.h>
using namespace std;
int ans(int a,int b){
    while(a!=b){
        if(a>b)
            a-=b;
        else
            b-=a;
    }
    return a;
}
void aaru(){
    int n,m;
    cin>>n>>m;
    if(n==1){
        cout<<1<<endl;
    }
    cout<<ans(n,m)<<endl;
}
int main(){
    int t;
    cin>>t;
    while(t--){
        aaru();
    }
    return 0;
}