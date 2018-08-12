import { RoutingModule } from './routing.module';

describe('RoutingModule', () => {
  let appRoutingModule: RoutingModule;

  beforeEach(() => {
    appRoutingModule = new RoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
