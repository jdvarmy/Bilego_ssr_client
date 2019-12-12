import { observable, action, configure, flow } from 'mobx';
import { eventService } from '../services';

configure({
  enforceActions: 'always'
});

class SingleEvent{
  @observable isLoading = false;
  @observable id = -1;
  @observable slug = '';

  @observable event = undefined;

  @observable sliderData = undefined;
  @observable sliderType = undefined; // esdse, video, image

  @action
  clear = () => {
    this.id = -1;
    this.slug = '';
    this.event = undefined;
    this.sliderData = undefined;
    this.sliderType = undefined;
  };

  @action
  setEventPage = (id, slug) => {
    this.id = id;
    this.slug = slug;
  };

  @action
  getEventDataBySlug = flow( function* getEventDataBySlug(apiRoot, params){
    this.isLoading = true;
    try{
      this.clear();

      const response = yield eventService.getEventDataBySlug(apiRoot, params);
      this.event = response;
      this.id = response.id;
      this.sliderData = response.slider;
      this.sliderType = response.slider_type;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  setSliderType = type => {
    this.sliderType = type;
  };
}

export default new SingleEvent();