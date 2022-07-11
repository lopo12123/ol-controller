import{create_tile_map__xyz as e,create_point_layer as a,create_point_cluster_layer as s,create_polygon_layer__GeoJson as t,create_polygon_layer__PathArray as r,create_polyline_layer as o}from"./core.js";import{AnimationController as i}from"./animation.js";import{PopupController as l}from"./popup.js";import"ol/ol.css";import"ol";import"ol/layer/Tile";import"ol/source";import"ol/layer/Vector";import"ol/source/Vector";import"ol/format";import"ol/style";import"ol/geom";import"ol/proj";import"ol/style/Circle";import"ol/layer/Image";import"ol/render";class n{#e;get dom(){return this.#e}#a=null;get instantiated(){return null!==this.#a}constructor(a,s){this.#e=a,this.#a=e(a,s)}render(a,s){null!==this.#a&&(console.warn('[OlController] There is a map instance on the target dom, calling the method "render" will overwrite the old map instance. If that`s what you`re doing, ignore this warning.'),this.dispose()),this.#e=a,this.#a=e(a,s)}#s=new Map;get layers(){return[...this.#s.keys()]}addPointLayer(e,s,t){if(this.#a){this.#s.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`);const r=a(s,t);this.#s.set(e,r),this.#a.addLayer(r)}else console.warn("[OlController] The map instance has already disposed.")}addPointClusterLayer(e,a,t,r,o,i){if(this.#a){this.#s.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`);const l=s(a,t,r,o,i);this.#s.set(e,l),this.#a.addLayer(l)}else console.warn("[OlController] The map instance has already disposed.")}addPolygonLayer(e,a,s){if(this.#a)if(this.#s.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`),"string"==typeof a){const r=t(a,s);this.#s.set(e,r),this.#a.addLayer(r)}else{const t=r(a,s);this.#s.set(e,t),this.#a.addLayer(t)}else console.warn("[OlController] The map instance has already disposed.")}addPolylineLayer(e,a,s){if(this.#a){this.#s.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`);const t=o(a,s);this.#s.set(e,t),this.#a.addLayer(t)}else console.warn("[OlController] The map instance has already disposed.")}toggle_visible(e,a){const s=this.#s.get(e);s&&s.setVisible(a??!s.getVisible())}removeLayer(e){void 0===e?(this.#s.forEach((e=>{e.dispose()})),this.#s.clear()):(this.#s.get(e)?.dispose(),this.#s.delete(e))}#t=new Map;get animationLayers(){return[...this.#t.keys()]}addAnimation(e,a,s,t=1e5,r,o){if(this.#a){this.#t.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`);const l=new i(this.#a,a,s,t,r,o);this.#t.set(e,l)}else console.warn("[OlController] The map instance has already disposed.")}getAnimation(e){return this.#t.get(e)??null}removeAnimation(e){void 0===e?(this.#t.forEach((e=>{e.dispose()})),this.#t.clear()):(this.#t.get(e)?.dispose(),this.#t.delete(e))}#r=new Map;get popupOverlays(){return[...this.#r.keys()]}addPopup(e,a,s,t){if(this.#a){this.#r.has(e)&&console.warn(`[OlController] A layer named "${e}" already exists, the old layer will be replaced by the new layer. If that's what you're doing, ignore this warning.`);const r=new l(a,this.#a,s,t);this.#r.set(e,r)}else console.warn("[OlController] The map instance has already disposed.")}getPopup(e){return this.#r.get(e)??null}removePopup(e){void 0===e?(this.#r.forEach((e=>{e.dispose()})),this.#r.clear()):(this.#r.get(e)?.dispose(),this.#r.delete(e))}animateTo(e,a=1500){this.#a?.getView().animate({center:e,duration:a})}cleanUp(){this.removeLayer(),this.removeAnimation()}dispose(){this.cleanUp(),this.#a?.dispose(),this.#a=null,this.#e=null}}export{n as OlController};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6WyJPbENvbnRyb2xsZXIiLCJkb20iLCJ0aGlzIiwibWFwIiwiaW5zdGFudGlhdGVkIiwiY29uc3RydWN0b3IiLCJlbCIsImluaXRPcHRpb25zIiwiY3JlYXRlX3RpbGVfbWFwX194eXoiLCJyZW5kZXIiLCJjb25zb2xlIiwid2FybiIsImRpc3Bvc2UiLCJsYXllcnMiLCJNYXAiLCJrZXlzIiwiYWRkUG9pbnRMYXllciIsImxheWVyTmFtZSIsInBvaW50cyIsImljb24iLCJoYXMiLCJsYXllcl9wb2ludCIsImNyZWF0ZV9wb2ludF9sYXllciIsInNldCIsImFkZExheWVyIiwiYWRkUG9pbnRDbHVzdGVyTGF5ZXIiLCJkaXN0YW5jZSIsIm1pbkRpc3RhbmNlIiwiY2x1c3RlclN0eWxlIiwibGF5ZXJfcG9pbnRfY2x1c3RlciIsImNyZWF0ZV9wb2ludF9jbHVzdGVyX2xheWVyIiwiYWRkUG9seWdvbkxheWVyIiwicG9seWdvbnMiLCJzdHlsZSIsImxheWVyX2pzb24iLCJjcmVhdGVfcG9seWdvbl9sYXllcl9fR2VvSnNvbiIsImxheWVyX3BhdGgiLCJjcmVhdGVfcG9seWdvbl9sYXllcl9fUGF0aEFycmF5IiwiYWRkUG9seWxpbmVMYXllciIsInBvbHlsaW5lcyIsImxheWVyX3BvbHlsaW5lIiwiY3JlYXRlX3BvbHlsaW5lX2xheWVyIiwidG9nZ2xlX3Zpc2libGUiLCJ0byIsInRhcmdldF9sYXllciIsImdldCIsInNldFZpc2libGUiLCJnZXRWaXNpYmxlIiwicmVtb3ZlTGF5ZXIiLCJ1bmRlZmluZWQiLCJmb3JFYWNoIiwidmVjTGF5ZXIiLCJjbGVhciIsImRlbGV0ZSIsImFuaW1hdGlvbkxheWVycyIsImFkZEFuaW1hdGlvbiIsInBhdGgiLCJpY29ucyIsImR1cmF0aW9uIiwicGVyY2VudFVwZGF0ZUNCIiwiYW5pbWF0aW9uX2NvbnRyb2xsZXIiLCJBbmltYXRpb25Db250cm9sbGVyIiwiZ2V0QW5pbWF0aW9uIiwicmVtb3ZlQW5pbWF0aW9uIiwiY29udHJvbGxlciIsInBvcHVwT3ZlcmxheXMiLCJhZGRQb3B1cCIsImFuY2hvciIsIm9mZnNldCIsInBvcHVwX2NvbnRyb2xsZXIiLCJQb3B1cENvbnRyb2xsZXIiLCJnZXRQb3B1cCIsInJlbW92ZVBvcHVwIiwiYW5pbWF0ZVRvIiwiY2VudGVyIiwiZ2V0VmlldyIsImFuaW1hdGUiLCJjbGVhblVwIl0sIm1hcHBpbmdzIjoid2lCQW9CQSxNQUFNQSxFQUtGQyxHQUlJQSxVQUNBLE9BQU9DLE1BQUtELEVBTWhCRSxHQUFxQixLQUtqQkMsbUJBQ0EsT0FBcUIsT0FBZEYsTUFBS0MsRUFRaEJFLFlBQ0lDLEVBQ0FDLEdBQ0FMLE1BQUtELEVBQU9LLEVBQ1pKLE1BQUtDLEVBQU9LLEVBQXFCRixFQUFJQyxHQVF6Q0UsT0FDSUgsRUFDQUMsR0FDaUIsT0FBZEwsTUFBS0MsSUFDSk8sUUFBUUMsS0FBSyxnTEFDYlQsS0FBS1UsV0FFVFYsTUFBS0QsRUFBT0ssRUFDWkosTUFBS0MsRUFBT0ssRUFBcUJGLEVBQUlDLEdBU3pDTSxHQUFVLElBQUlDLElBSVZELGFBQ0EsTUFBTyxJQUFLWCxNQUFLVyxFQUFRRSxRQVN0QkMsY0FDSEMsRUFDQUMsRUFDQUMsR0FDQSxHQUFJakIsTUFBS0MsRUFHSixDQUNFRCxNQUFLVyxFQUFRTyxJQUFJSCxJQUNoQlAsUUFBUUMsS0FBSyxpQ0FBa0NNLHlIQUduRCxNQUFNSSxFQUFjQyxFQUFtQkosRUFBUUMsR0FDL0NqQixNQUFLVyxFQUFRVSxJQUFJTixFQUFXSSxHQUM1Qm5CLE1BQUtDLEVBQUtxQixTQUFTSCxRQVRuQlgsUUFBUUMsS0FBSyx5REFzQmRjLHFCQUNIUixFQUNBQyxFQUNBQyxFQUNBTyxFQUNBQyxFQUNBQyxHQUNBLEdBQUkxQixNQUFLQyxFQUdKLENBQ0VELE1BQUtXLEVBQVFPLElBQUlILElBQ2hCUCxRQUFRQyxLQUFLLGlDQUFrQ00seUhBR25E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