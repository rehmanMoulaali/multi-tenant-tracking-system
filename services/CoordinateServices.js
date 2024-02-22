const prisma = require("../db/db.config.js");
const bcrypt = require('bcryptjs');
const {CustomAPIError,ResourceNotFound,UnauthenticatedError,UnauthorizedError} = require("../errors/index.js");


/**
* Creates a new route coordinate in the database.
*
* @param {number} lonlongitude - The longitude of the route coordinate.
* @param {number} latitude - The latitude of the route coordinate.
* @param {number} routeId - The ID of the route that the route coordinate belongs to.
* @param {number} order - The order of the route coordinate within the route.
*
* @returns {Promise<RouteCoordinate>} The newly created route coordinate.
*/
async function createRouteCoordinateService(lonlongitude, latitude, routeId,order) {
    return await prisma.routeCoordinate.create({
        data: {
            lonlongitude: lonlongitude,
            latitude: latitude,
            routeId: routeId,
            order:order
        }
    });
}

/**
* Gets a route coordinate by its ID.
*
* @param {number} id The ID of the route coordinate to get.
* @returns {Promise<RouteCoordinate>} The route coordinate with the given ID.
*/
async function getRouteCoordinateByIdService(id) {
    return await prisma.routeCoordinate.findUnique({
        where: {
            id: id
        }
    });
}


/**
* Get all route coordinates for a given route ID.
*
* @param {number} routeId The ID of the route to get the coordinates for.
* @returns {Promise<Array<RouteCoordinate>>} An array of objects, each representing a route coordinate.
*/
async function getRouteCoordinatesByRouteIdService(routeId) {
    return await prisma.routeCoordinate.findMany({
        where: {
            routeId: routeId
        },
        orderBy: {
            order: 'asc' 
        }
    });
}

/**
* Updates a route coordinate in the database.
*
* @param {number} id The id of the route coordinate to update.
* @param {number} order The new order of the route coordinate.
* @param {number} lonlongitude The new longitude of the route coordinate.
* @param {number} latitude The new latitude of the route coordinate.
*
* @returns {Promise<RouteCoordinate>} The updated route coordinate.
*/
async function updateRouteCoordinateService(id, order, lonlongitude, latitude) {
    return await prisma.routeCoordinate.update({
        where: {
            id: id
        },
        data: {
            order: order,
            lonlongitude: lonlongitude,
            latitude: latitude
        }
    });
}

/**
 * Delete a route coordinate in the database.
 * @param {number} id The id of the route coordinate to delete.
 * @returns  {Promise<RouteCoordinate>} The deleted route coordinate.
 */
async function deleteRouteCoordinate(id) { 
    return await prisma.routeCoordinate.delete({
        where: {
            id: id
        }
    });
}
