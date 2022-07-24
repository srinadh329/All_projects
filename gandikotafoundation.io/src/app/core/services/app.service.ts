import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }


  getGalleryList(){
    return this.http.get(`${environment.baseUrl}/admin/gallery`)
  }

  getGalleryById(id:any) {
    return this.http.get(`${environment.baseUrl}/admin/gallery/${id}`)
  }

  deleteGalleryById(id:any) {
    return this.http.delete(`${environment.baseUrl}/admin/gallery/${id}`)
  }

  createGallery(data:any) {
    return this.http.post(`${environment.baseUrl}/admin/gallery`,data)
  }

  updateGallery(id:any,data:any) {
    return this.http.put(`${environment.baseUrl}/admin/gallery/${id}`,data)
  }

  getTestimonials() {
    return this.http.get(`${environment.baseUrl}/admin/testimonials`)
  }

  getTestimonialById(id:any) {
    return this.http.get(`${environment.baseUrl}/admin/testimonials/${id}`)
  }

  deleteTestimonialById(id:any) {
    return this.http.delete(`${environment.baseUrl}/admin/testimonials/${id}`)
  }

  createTestimonial(data:any) {
    return this.http.post(`${environment.baseUrl}/admin/testimonials`,data)
  }

  updateTestimonial(id:any,data:any) {
    return this.http.put(`${environment.baseUrl}/admin/testimonials/${id}`,data)
  }

  getServices() {
    return this.http.get(`${environment.baseUrl}/admin/home-events`)
  }

  getServiceById(id:any) {
    return this.http.get(`${environment.baseUrl}/admin/home-events/${id}`)
  }

  deleteServiceById(id:any) {
    return this.http.delete(`${environment.baseUrl}/admin/home-events/${id}`)
  }

  createService(data:any) {
    return this.http.post(`${environment.baseUrl}/admin/home-events`,data)
  }

  updateService(id:any,data:any) {
    return this.http.post(`${environment.baseUrl}/admin/home-events`,data)
  }

  getContactRequestsList() {
    return this.http.get(`${environment.baseUrl}/admin/contacts`)
  }

  getContactRequestById(id:any) {
    return this.http.get(`${environment.baseUrl}/admin/contacts/${id}`)
  }

  createContactRequest(data:any) {
    return this.http.post(`${environment.baseUrl}/contact`,data)
  }

  deleteContactRequestById(id:any) {
    return this.http.delete(`${environment.baseUrl}/admin/contacts/${id}`)
  }

  updateContactRequest(id:any,data:any) {
    return this.http.put(`${environment.baseUrl}/admin/contacts/${id}`,data)
  }

  getAboutInfo() {
    return this.http.get(`${environment.baseUrl}/admin/about-us`)
  }

  createAboutInfo(data:any) {
    return this.http.post(`${environment.baseUrl}/admin/about-us`,data)
  }
  
  updateAboutInfo(id:any,data:any) {
    return this.http.put(`${environment.baseUrl}/admin/about-us/${id}`,data)
  }

  getContactInfo() {
    return this.http.get(`${environment.baseUrl}/admin/business`)
  }
  createContactInfo(data:any) {
    return this.http.post(`${environment.baseUrl}/admin/business`,data)
  }
  updateContactInfo(id:any,data:any) {
    return this.http.put(`${environment.baseUrl}/admin/business/${id}`,data)
  }
  
  getHomeBanners() {
    return this.http.get(`${environment.baseUrl}/home-banner`)
  }
  getHomeEvents(query:any){
    return this.http.get(`${environment.baseUrl}/home-events`,{params:query})
  }
  getHomeTestimonials(){
    return this.http.get(`${environment.baseUrl}/testimonials`)
  }
  getHomeGallery(query:any){
    return this.http.get(`${environment.baseUrl}/gallery`,{params:query})
  }
  getServiceEvents(query:any){
    return this.http.get(`${environment.baseUrl}/home-events`,{params:query})
  }
  getBussinessAddress(){
    return this.http.get(`${environment.baseUrl}/business`)
  }
  getAboutUs(){
    return this.http.get(`${environment.baseUrl}/about-us`)
  }
  createContact(data:any){
    return this.http.post(`${environment.baseUrl}/contact`, data)
  }
}
