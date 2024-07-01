// WSF documentation for VesselLocations API
// wsdot.wa.gov/ferries/api/vessels/documentation/rest.html

import { fetchWsf, toDate } from "./fetchWsf";

export interface VesselLocation {
  vesselID: number;
  vesselName: string;
  departTermID: number;
  departTermName: string;
  departTermAbrv: string;
  arrivTermID?: number;
  arrivTermName?: string;
  arrivTermAbrv?: string;
  lat: number;
  lon: number;
  speed: number;
  heading: number;
  inService: boolean;
  atDock: boolean;
  leftDock?: Date;
  eta?: Date;
  schedDeparture?: Date;
  opRouteAbrv?: string;
  vesselPosNum?: number;
  timeStamp: Date;
  timeFetched: Date;
}

interface WsfVesselLocation {
  VesselID: number; // Unique identifier for a vessel.
  VesselName: string; // (string): The name of the vessel.
  Mmsi?: number; // (integer, optional): The vessel's Maritime Mobile Service Identity.
  DepartingTerminalID: number; // (integer): Unique identifier pertaining to the terminal where this vessel is docked or was last docked.
  DepartingTerminalName: string; // (string): The name of the terminal where this vessel is docked or was last docked.
  DepartingTerminalAbbrev: string; // (string): The abbreviated terminal name where this vessel is docked or was last docked.
  ArrivingTerminalID?: number; // (integer, optional): Unique identifier pertaining to the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
  ArrivingTerminalName?: string; // (string, optional): The name of the terminal that represents the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
  ArrivingTerminalAbbrev?: string; // (string, optional): The abbreviated terminal name that represent's the vessel's next destination. Might not be present if the next scheduled destination is still being determined.
  Latitude: number; // (double): The latitude of the vessel.
  Longitude: number; // (double): The longitude of the vessel.
  Speed: number; // (double): The speed of the vessel (in Knots).
  Heading: number; // (double): The heading of the vessel (in degrees).
  InService: boolean; // (bool): Indicates whether or not the vessel is in service.
  AtDock: boolean; // (bool): Indicates whether or not the vessel is docked.
  LeftDock?: Date; // (date, optional): The date and time that the vessel last left the dock. This value is not present when docked.
  Eta?: Date; // (date, optional): The estimated date and time that the vessel will arrive at its destination. This value is not present when docked.
  EtaBasis?: string; // (string, optional): A brief description summarizing how the Eta is being calculated. This value is not present when docked.
  ScheduledDeparture?: Date; // (date, optional): The date and time when this vessel was or is scheduled to leave its departing terminal. Might not be present if the next scheduled destination is still being determined.
  OpRouteAbbrev?: string[]; // (array): An array of strings that contain 0 or more abbreviated route names currently being serviced by this vessel.
  VesselPositionNum: number; // (integer, optional): For a given route, the number used to identify the scheduled departures being serviced by this vessel. Not present if vessel is not in service.
  SortSeq: number; // (integer): A preferred sort order (sort-ascending with respect to other vessels).
  ManagedBy: number; // (enum / integer): Indicates who manages this vessel. 1 for WSF, 2 for KCM.
  TimeStamp: Date; // (date): The date and time when this vessel location was last updated.
}

export const toVesselLocation = (vl: WsfVesselLocation): VesselLocation => ({
  vesselID: vl.VesselID,
  vesselName: vl.VesselName,
  departTermID: vl.DepartingTerminalID,
  departTermName: vl.DepartingTerminalName,
  departTermAbrv: vl.DepartingTerminalAbbrev,
  arrivTermID: vl.ArrivingTerminalID,
  arrivTermName: vl.ArrivingTerminalName,
  arrivTermAbrv: vl.ArrivingTerminalAbbrev,
  lat: vl.Latitude,
  lon: vl.Longitude,
  speed: vl.Speed,
  heading: vl.Heading,
  inService: vl.InService,
  atDock: vl.AtDock,
  leftDock: vl.LeftDock,
  eta: vl.Eta,
  schedDeparture: vl.ScheduledDeparture,
  opRouteAbrv: vl.OpRouteAbbrev?.at(0) ?? "",
  vesselPosNum: vl.VesselPositionNum,
  timeStamp: vl.TimeStamp,
  timeFetched: new Date(),
});

export const fetchVesselLocations = async () =>
  (await fetchWsf("vessels/rest/vessellocations")).map(toVesselLocation) as VesselLocation[];

// await fetchVesselLocations().then((vesselLocations) => console.log(vesselLocations[0]));
