using HomeStoreContextLib;
using HomeStoreEntityLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreItemsController : ControllerBase
    {
        private readonly HomeStoreContext _context;

        public StoreItemsController(HomeStoreContext context)
        {
            _context = context;
        }
        // GET api/storeitems
        [HttpGet]
        public async Task<ActionResult<List<StoreItem>>> Get()
        {
            var storeItems = await _context.StoreItems.ToListAsync();
            return Ok(storeItems);
        }
        // GET api/storeitems/id
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreItem>> Get(Guid id)
        {
            var storeItem = await _context.StoreItems.FindAsync(id);
            if (storeItem is null)
                return BadRequest();
            return Ok(storeItem);
        }
        // POST api/storeitems
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] StoreItem storeItem)
        {
            if (storeItem is null)
                return BadRequest();
            _context.StoreItems.Add(storeItem);
            int affected = await _context.SaveChangesAsync();
            if (affected == 1)
                return Ok();
            else
                return BadRequest();
        }
        // DELETE api/storeitems/id
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var storeItem = await _context.StoreItems.FindAsync(id);
            if (storeItem is null)
                return BadRequest();
            _context.StoreItems.Remove(storeItem);
            int affected = await _context.SaveChangesAsync();
            if (affected == 1)
                return Ok();
            else
                return BadRequest();
        }
    }
}