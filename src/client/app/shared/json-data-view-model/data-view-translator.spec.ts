import { SiteLogDataModel } from './data-model/site-log-data-model';
import { DataViewTranslatorService, ObjectMap } from './data-view-translator';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { GnssReceiverViewModel } from '../../gnss-receiver/gnss-receiver-view-model';
import { MiscUtils } from '../global/misc-utils';
import { DataViewTranslatorSpecData } from './data-view-translator.spec.data';
import { SiteLocationMappings } from '../../site-log/site-location.mapping';
import { JsonViewModelService } from './json-view-model.service';

export function main() {
  let completeValidSitelog: any = JsonViewModelServiceSpecData.data();
  let objectMap: ObjectMap = new HumiditySensorViewModel().getObjectMap();
  let jsonViewModelService: JsonViewModelService = new JsonViewModelService();

  describe('Json view translator service', () => {

    it('should be defined', () => {
      expect(completeValidSitelog).toBeDefined();
      expect(objectMap).toBeDefined();
    });

    it('should translate d2v for humiditySensors', () => {
      let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

      expect(firstHSV).toBeDefined();

      expect(firstHSV.accuracyPercentRelativeHumidity).not.toBeNull();
      expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
      expect(firstHSV.aspiration).toBeNull();
      expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
      expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
      expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
      expect(firstHSV.notes).toBeNull();
      expect(firstHSV.serialNumber).toBeNull();

      expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
      expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
      expect(firstHSV.endDate).toBeNull();
    });

    it('should translate v2d for humiditySensors', () => {
      let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

      let newHSD: any = {};
      DataViewTranslatorService.translate(firstHSV, newHSD, firstHSV.getObjectMap().inverse());

      expect(newHSD).toBeDefined();

      expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
      expect(newHSD.humiditySensor.aspiration).toBeNull();
      expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
      expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
      expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
      expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
      expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

      expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSV.endDate).toBeNull();
      expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
    });

      it('should translate d2v for humiditySensors using translate method', () => {
          let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap()); // comment

          expect(firstHSV).toBeDefined();

          expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
          expect(firstHSV.aspiration).toBeNull();
          expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
          expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
          expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
          expect(firstHSV.notes).toBeNull();
          expect(firstHSV.serialNumber).toBeNull();

          expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
          expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
          expect(firstHSV.endDate).toBeNull();
      });

      it('should translate v2d for humiditySensors using translate method', () => {
          let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

          let newHSD: any = {};
          DataViewTranslatorService.translate(firstHSV, newHSD, firstHSV.getObjectMap().inverse());

          expect(newHSD).toBeDefined();

          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).not.toBeNull();
          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
          expect(newHSD.humiditySensor.aspiration).toEqual(firstHSV.aspiration);
          expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
          expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
          expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
          expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
          expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

          expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
          expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSV.endDate).toBeNull();
          expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
      });

      describe('Point type translate', () => {
          // CartesianPosition
          it('should translate SiteLocations CartesianPosition View to Data - has 3 point values (normal case)', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let cartesianPositionView: any = view.siteLocation.cartesianPosition;

              let cartesianPositionData: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionView, {viewToData: true});

              expect(cartesianPositionData.point.pos.value[0]).toBe(cartesianPositionView.cartesianPosition_x);
              expect(cartesianPositionData.point.pos.value[1]).toBe(cartesianPositionView.cartesianPosition_y);
              expect(cartesianPositionData.point.pos.value[2]).toBe(cartesianPositionView.cartesianPosition_z);
          });

          it('should translate SiteLocations CartesianPosition View to Data - has null point values', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let cartesianPositionView: any = view.siteLocation.cartesianPosition;
              cartesianPositionView.cartesianPosition_x = null; // The UI forces either all to be required or none to be.  So just one is ok

              let cartesianPositionData: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionView, {viewToData: true});

              expect(typeof cartesianPositionData).toBe("object");
              expect(Object.keys(cartesianPositionData).length).toBe(0);
          });

          it('should translate SiteLocations CartesianPosition Data to View - has 3 point values (normal case)', () => {
              let data: any = DataViewTranslatorSpecData.dataObject();
              let cartesianPositionData: any = data.siteLocation.approximatePositionITRF.cartesianPosition;

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionData, {viewToData: false});

              expect(cartesianPositionView.cartesianPosition_x).toBe(cartesianPositionData.point.pos.value[0]);
              expect(cartesianPositionView.cartesianPosition_y).toBe(cartesianPositionData.point.pos.value[1]);
              expect(cartesianPositionView.cartesianPosition_z).toBe(cartesianPositionData.point.pos.value[2]);
          });

          it('should translate SiteLocations CartesianPosition Data to View - has null point values', () => {
              let cartesianPositionData = {TYPE_NAME: "GEODESYML_0_4.CartesianPosition"};

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionData, {viewToData: false});

              expect(typeof cartesianPositionView).toBe("object");
              expect(cartesianPositionView.cartesianPosition_x).toBeNull();
              expect(cartesianPositionView.cartesianPosition_y).toBeNull();
              expect(cartesianPositionView.cartesianPosition_z).toBeNull();
          });
          // GeodeticPosition
          it('should translate SiteLocations GeodeticPosition View to Data - has 3 point values (normal case)', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let geodeticPositionView: any = view.siteLocation.geodeticPosition;

              let geodeticPositionData: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionView, {viewToData: true});

              expect(geodeticPositionData.point.pos.value[0]).toBe(geodeticPositionView.geodeticPosition_lat);
              expect(geodeticPositionData.point.pos.value[1]).toBe(geodeticPositionView.geodeticPosition_long);
              expect(geodeticPositionData.point.pos.value[2]).toBe(geodeticPositionView.geodeticPosition_height);
          });

          it('should translate SiteLocations GeodeticPosition View to Data - has null point values', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let geodeticPositionView: any = view.siteLocation.geodeticPosition;
              geodeticPositionView.geodeticPosition_lat = null; // The UI forces either all to be required or none to be.  So just one is ok

              let geodeticPositionData: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionView, {viewToData: true});

              expect(typeof geodeticPositionData).toBe("object");
              expect(Object.keys(geodeticPositionData).length).toBe(0);
          });

          it('should translate SiteLocations GeodeticPosition Data to View - has 3 point values (normal case)', () => {
              let data: any = DataViewTranslatorSpecData.dataObject();
              let geodeticPositionData: any = data.siteLocation.approximatePositionITRF.geodeticPosition;

              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionData, {viewToData: false});

              expect(geodeticPositionView.geodeticPosition_lat).toBe(geodeticPositionData.point.pos.value[0]);
              expect(geodeticPositionView.geodeticPosition_long).toBe(geodeticPositionData.point.pos.value[1]);
              expect(geodeticPositionView.geodeticPosition_height).toBe(geodeticPositionData.point.pos.value[2]);
          });

          it('should translate SiteLocations GeodeticPosition Data to View - has null point values', () => {
              let geodeticPositionData = {TYPE_NAME: "GEODESYML_0_4.GeodeticPosition"};
              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionData, {viewToData: false});

              expect(typeof geodeticPositionView).toBe("object");
              expect(geodeticPositionView.geodeticPosition_lat).toBeNull();
              expect(geodeticPositionView.geodeticPosition_long).toBeNull();
              expect(geodeticPositionView.geodeticPosition_height).toBeNull();
          });

          // Both GeodeticPosition and CartesianPosition
          it('should translate SiteLocations GeodeticPosition and CartesianPosition as defaults (null) due to null parents', () => {
              let data: any = DataViewTranslatorSpecData.dataObject();
              // If GeodeticPosition and CartesianPosition are saved as null then JSonix sets the parent
              // approximatePositionITRF element to empty
              // The mapper will pull out no values to try and translate
              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(undefined, {viewToData: false});

              expect(typeof geodeticPositionView).toBe("object");
              expect(geodeticPositionView.geodeticPosition_lat).toBeNull();
              expect(geodeticPositionView.geodeticPosition_long).toBeNull();
              expect(geodeticPositionView.geodeticPosition_height).toBeNull();

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(undefined, {viewToData: false});

              expect(typeof cartesianPositionView).toBe("object");
              expect(cartesianPositionView.cartesianPosition_x).toBeNull();
              expect(cartesianPositionView.cartesianPosition_y).toBeNull();
              expect(cartesianPositionView.cartesianPosition_z).toBeNull();
          });
      });
  });
}
