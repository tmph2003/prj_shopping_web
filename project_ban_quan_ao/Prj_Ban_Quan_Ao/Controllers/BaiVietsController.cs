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
    public class BaiVietsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public BaiVietsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/BaiViets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BaiViet>>> GetBaiViets()
        {
            return await _context.BaiViets.OrderByDescending(x => x.NgayTao).ToListAsync();
        }

        // GET: api/BaiViets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaiViet>> GetBaiViet(Guid id)
        {
            var baiViet = await _context.BaiViets.FindAsync(id);

            if (baiViet == null)
            {
                return NotFound();
            }

            return baiViet;
        }

        // PUT: api/BaiViets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBaiViet(Guid id, BaiViet baiViet)
        {
            if (id != baiViet.Id)
            {
                return BadRequest();
            }

            _context.Entry(baiViet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BaiVietExists(id))
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

        // POST: api/BaiViets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BaiViet>> PostBaiViet(BaiViet baiViet)
        {
            _context.BaiViets.Add(baiViet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBaiViet", new { id = baiViet.Id }, baiViet);
        }

        // DELETE: api/BaiViets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBaiViet(Guid id)
        {
            var baiViet = await _context.BaiViets.FindAsync(id);
            if (baiViet == null)
            {
                return NotFound();
            }

            _context.BaiViets.Remove(baiViet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BaiVietExists(Guid id)
        {
            return _context.BaiViets.Any(e => e.Id == id);
        }
    }
}
