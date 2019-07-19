import { GaService } from './ga.service';

export abstract class BaseComponent {
  protected constructor(protected ga: GaService) {
    ga.SetPageView();
  }
}
