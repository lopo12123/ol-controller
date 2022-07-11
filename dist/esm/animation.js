import{Feature as e}from"ol";import t from"ol/layer/Vector";import{LineString as r,Point as i}from"ol/geom";import s from"ol/source/Vector";import{Style as a,Stroke as n,Icon as o}from"ol/style";import{getVectorContext as l}from"ol/render";class h{#e;#t;#r;#i;#s;#a=!1;get playing(){return this.#a}#n;#o;#l=0;#h=null;#p=-1;constructor(l,h,p,c=1e5,y,d){if(h.length<=1)throw new Error("[OlController] Your animation-path is too short, need 2 point at least!");this.#e=l,this.#n=c,this.#o=1e5/c,this.#h=d??null;const m=new s,_=new t({source:m});this.#t=_;const g=new r(h),f=new e(g);f.setStyle(new a({stroke:new n({width:y?.width??6,color:y?.stroke??"#39c"})})),m.addFeature(f),this.#r=g;const u=new e({geometry:new i(h[0])});if(u.setStyle(new a({image:new o({anchor:[.5,.5],anchorXUnits:"fraction",anchorYUnits:"fraction",src:p.player})})),m.addFeature(u),this.#i=u,this.#s=u.getGeometry(),p.start){const t=new e({geometry:new i(h[0])});t.setStyle(new a({image:new o({anchor:[.5,.5],anchorXUnits:"fraction",anchorYUnits:"fraction",src:p.start})})),m.addFeature(t)}if(p.end){const t=new e({geometry:new i(h[h.length-1])});t.setStyle(new a({image:new o({anchor:[.5,.5],anchorXUnits:"fraction",anchorYUnits:"fraction",src:p.end})})),m.addFeature(t)}this.#e.addLayer(_)}setDuration(e){this.#n=e}#c=(e=>{const t=e.frameState.time,r=t-this.#p;if(this.#l=this.#l+r/this.#n,this.#p=t,this.#h?.(this.#l),this.#l>1)this.reset();else{const t=this.#r.getCoordinateAt(this.#l);this.#s.setCoordinates(t);const r=l(e);r.setStyle(this.#i.getStyle()),r.drawGeometry(this.#s),this.#e?.render()}}).bind(this);play(){this.#a||(this.#a=!0,this.#p=Date.now(),this.#t.on("postrender",this.#c),this.#i.setGeometry(null))}pause(){this.#a&&(this.#a=!1,this.#i.setGeometry(this.#s),this.#t.un("postrender",this.#c))}reset(e=!1){this.pause(),this.#l=0,this.#h?.(0),e&&(this.#o=1)}toggle_visible(e){this.#t.setVisible(e??!this.#t.getVisible())}dispose(){this.pause(),this.#e?.removeLayer(this.#t),this.#e=null}}export{h as AnimationController};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvYW5pbWF0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIkFuaW1hdGlvbkNvbnRyb2xsZXIiLCJtYXAiLCJsYXllciIsInJvdXRlIiwicGxheWVyIiwicGxheWVyX2dlbyIsInBsYXlpbmciLCJ0aGlzIiwiZHVyYXRpb24iLCJzcGVlZCIsImRpc19wZXJjZW50IiwicGVyY2VudFVwZGF0ZUNCIiwibGFzdF9yYWZfdGltZSIsImNvbnN0cnVjdG9yIiwicGF0aCIsImljb25zIiwic3R5bGUiLCJsZW5ndGgiLCJFcnJvciIsImFuaW1hdGlvbl9zb3VyY2UiLCJWZWN0b3JTb3VyY2UiLCJhbmltYXRpb25fbGF5ZXIiLCJWZWN0b3JMYXllciIsInNvdXJjZSIsIkxpbmVTdHJpbmciLCJyb3V0ZV9mZWF0dXJlIiwiRmVhdHVyZSIsInNldFN0eWxlIiwiU3R5bGUiLCJzdHJva2UiLCJTdHJva2UiLCJ3aWR0aCIsImNvbG9yIiwiYWRkRmVhdHVyZSIsInBsYXllcl9mZWF0dXJlIiwiZ2VvbWV0cnkiLCJQb2ludCIsImltYWdlIiwiSWNvbiIsImFuY2hvciIsImFuY2hvclhVbml0cyIsImFuY2hvcllVbml0cyIsInNyYyIsImdldEdlb21ldHJ5Iiwic3RhcnQiLCJlbmQiLCJhZGRMYXllciIsInNldER1cmF0aW9uIiwiYW5pbWF0aW9uX2NhbGxiYWNrX2Zvcl9zZWxmIiwiZXYiLCJjdXJyX3JhZl90aW1lIiwiZnJhbWVTdGF0ZSIsInRpbWUiLCJlbGFwc2VkVGltZSIsInJlc2V0IiwiY3Vycl9jb29yZGluYXRlIiwiZ2V0Q29vcmRpbmF0ZUF0Iiwic2V0Q29vcmRpbmF0ZXMiLCJ2ZWN0b3JDdHgiLCJnZXRWZWN0b3JDb250ZXh0IiwiZ2V0U3R5bGUiLCJkcmF3R2VvbWV0cnkiLCJyZW5kZXIiLCJiaW5kIiwicGxheSIsIkRhdGUiLCJub3ciLCJvbiIsInNldEdlb21ldHJ5IiwicGF1c2UiLCJ1biIsInJlc2V0X3NwZWVkIiwidG9nZ2xlX3Zpc2libGUiLCJ0byIsInNldFZpc2libGUiLCJnZXRWaXNpYmxlIiwiZGlzcG9zZSIsInJlbW92ZUxheWVyIl0sIm1hcHBpbmdzIjoiZ1BBV0EsTUFBTUEsRUFJRkMsR0FLU0MsR0FLQUMsR0FLQUMsR0FJQUMsR0FLVEMsSUFBVyxFQUlQQSxjQUNBLE9BQU9DLE1BQUtELEVBTWhCRSxHQUlBQyxHQUlBQyxHQUFlLEVBSU5DLEdBQTRELEtBS3JFQyxJQUFrQixFQVdsQkMsWUFDSVosRUFDQWEsRUFDQUMsRUFLQVAsRUFBbUIsSUFDbkJRLEVBSUFMLEdBQ0EsR0FBR0csRUFBS0csUUFBVSxFQUFHLE1BQU0sSUFBSUMsTUFBTSwyRUFFckNYLE1BQUtOLEVBQU9BLEVBQ1pNLE1BQUtDLEVBQVlBLEVBQ2pCRCxNQUFLRSxFQUFTLElBQVVELEVBQ3hCRCxNQUFLSSxFQUFtQkEsR0FBbUIsS0FLM0MsTUFBTVEsRUFBbUIsSUFBSUMsRUFDdkJDLEVBQWtCLElBQUlDLEVBQVksQ0FBRUMsT0FBUUosSUFFbERaLE1BQUtMLEVBQVNtQixFQUlkLE1BQU1sQixFQUFRLElBQUlxQixFQUFXVixHQUN2QlcsRUFBZ0IsSUFBSUMsRUFBUXZCLEdBQ2xDc0IsRUFBY0UsU0FBUyxJQUFJQyxFQUFNLENBQzdCQyxPQUFRLElBQUlDLEVBQU8sQ0FDZkMsTUFBT2YsR0FBT2UsT0FBUyxFQUN2QkMsTUFBT2hCLEdBQU9hLFFBQVUsWUFJaENWLEVBQWlCYyxXQUFXUixHQUM1QmxCLE1BQUtKLEVBQVNBLEVBSWQsTUFBTStCLEVBQWlCLElBQUlSLEVBQVEsQ0FDL0JTLFNBQVUsSUFBSUMsRUFBTXRCLEVBQUssTUFpQjdCLEdBZkFvQixFQUFlUCxTQUFTLElBQUlDLEVBQU0sQ0FDOUJTLE1BQU8sSUFBSUMsRUFBSyxDQUNaQyxPQUFRLENBQUUsR0FBSyxJQUNmQyxhQUFjLFdBQ2RDLGFBQWMsV0FDZEMsSUFBSzNCLEVBQU1YLFlBSW5CZSxFQUFpQmMsV0FBV0MsR0FDNUIzQixNQUFLSCxFQUFVOEIsRUFDZjNCLE1BQUtGLEVBQWM2QixFQUFlUyxjQUk3QjVCLEVBQU02QixNQUFPLENBQ2QsTUFBTUEsRUFBUSxJQUFJbEIsRUFBUSxDQUN0QlMsU0FBVSxJQUFJQyxFQUFNdEIsRUFBSyxNQUU3QjhCLEVBQU1qQixTQUFTLElBQUlDLEVBQU0sQ0FDckJTLE1BQU8sSUFBSUMsRUFBSyxDQUNaQyxPQUFRLENBQUUsR0FBSyxJQUNmQyxhQUFjLFdBQ2RDLGFBQWMsV0FDZEMsSUFBSzNCLEVBQU02QixXQUduQnpCLEVBQWlCYyxXQUFXVyxHQUtoQyxHQUFLN0IsRUFBTThCLElBQUssQ0FDWixNQUFNQSxFQUFNLElBQUluQixFQUFRLENBQ3BCUyxTQUFVLElBQUlDLEVBQU10QixFQUFLQSxFQUFLRyxPQUFTLE1BRTNDNEIsRUFBSWxCLFNBQVMsSUFBSUMsRUFBTSxDQUNuQlMsTUFBTyxJQUFJQyxFQUFLLENBQ1pDLE9BQVEsQ0FBRSxHQUFLLElBQ2ZDLGFBQWMsV0FDZEMsYUFBYyxXQUNkQyxJQUFLM0IsRUFBTThCLFNBR25CMUIsRUFBaUJjLFdBQVdZLEdBTWhDdEMsTUFBS04sRUFBSzZDLFNBQVN6QixHQU12QjBCLFlBQVl2QyxHQUNSRCxNQUFLQyxFQUFZQSxFQU9yQndDLElBQWlDQyxJQUU3QixNQUFNQyxFQUFnQkQsRUFBR0UsV0FBWUMsS0FDL0JDLEVBQWNILEVBQWdCM0MsTUFBS0ssRUFRekMsR0FQQUwsTUFBS0csRUFBZUgsTUFBS0csRUFBZTJDLEVBQWM5QyxNQUFLQyxFQUMzREQsTUFBS0ssRUFBaUJzQyxFQUd0QjNDLE1BQUtJLElBQW1CSixNQUFLRyxHQUcxQkgsTUFBS0csRUFBZSxFQUNuQkgsS0FBSytDLFlBR0osQ0FHRCxNQUFNQyxFQUFrQmhELE1BQUtKLEVBQU9xRCxnQkFBZ0JqRCxNQUFLRyxHQUV6REgsTUFBS0YsRUFBWW9ELGVBQWVGLEdBR2hDLE1BQU1HLEVBQVlDLEVBQWlCVixHQUNuQ1MsRUFBVS9CLFNBQVNwQixNQUFLSCxFQUFRd0QsWUFDaENGLEVBQVVHLGFBQWF0RCxNQUFLRixHQUc1QkUsTUFBS04sR0FBTTZELFlBRWhCQyxLQUFLeEQsTUFLUnlELE9BRVF6RCxNQUFLRCxJQUVMQyxNQUFLRCxHQUFXLEVBR2hCQyxNQUFLSyxFQUFpQnFELEtBQUtDLE1BRzNCM0QsTUFBS0wsRUFBT2lFLEdBQUcsYUFBYzVELE1BQUt5QyxHQUdsQ3pDLE1BQUtILEVBQVFnRSxZQUFZLE9BT2pDQyxRQUVPOUQsTUFBS0QsSUFFSkMsTUFBS0QsR0FBVyxFQUdoQkMsTUFBS0gsRUFBUWdFLFlBQVk3RCxNQUFLRixHQUU5QkUsTUFBS0wsRUFBT29FLEdBQUcsYUFBYy9ELE1BQUt5QyxJQVUxQ00sTUFBTWlCLEdBQXVCLEdBQ3pCaEUsS0FBSzhELFFBQ0w5RCxNQUFLRyxFQUFlLEVBQ3BCSCxNQUFLSSxJQUFtQixHQUVyQjRELElBQ0NoRSxNQUFLRSxFQUFTLEdBUXRCK0QsZUFBZUMsR0FDWGxFLE1BQUtMLEVBQU93RSxXQUFXRCxJQUFPbEUsTUFBS0wsRUFBT3lFLGNBTTlDQyxVQUNJckUsS0FBSzhELFFBQ0w5RCxNQUFLTixHQUFNNEUsWUFBWXRFLE1BQUtMLEdBQzVCSyxNQUFLTixFQUFPIn0=
