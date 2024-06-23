using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnhDanhGiumsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public AnhDanhGiumsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/AnhDanhGiums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhDanhGium>>> GetAnhDanhGia()
        {
            return await _context.AnhDanhGia.ToListAsync();
        }

        // GET: api/AnhDanhGiums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnhDanhGium>> GetAnhDanhGium(Guid id)
        {
            var anhDanhGium = await _context.AnhDanhGia.FindAsync(id);

            if (anhDanhGium == null)
            {
                return NotFound();
            }

            return anhDanhGium;
        }

        // PUT: api/AnhDanhGiums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnhDanhGium(Guid id, AnhDanhGium anhDanhGium)
        {
            if (id != anhDanhGium.Id)
            {
                return BadRequest();
            }

            _context.Entry(anhDanhGium).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnhDanhGiumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AnhDanhGiums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnhDanhGium>> PostAnhDanhGium(AnhDanhGium anhDanhGium)
        {
            _context.AnhDanhGia.Add(anhDanhGium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnhDanhGium", new { id = anhDanhGium.Id }, anhDanhGium);
        }

        // DELETE: api/AnhDanhGiums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnhDanhGium(Guid id)
        {
            var anhDanhGium = await _context.AnhDanhGia.FindAsync(id);
            if (anhDanhGium == null)
            {
                return NotFound();
            }

            _context.AnhDanhGia.Remove(anhDanhGium);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool AnhDanhGiumExists(Guid id)
        {
            return _context.AnhDanhGia.Any(e => e.Id == id);
        }
    }
}
